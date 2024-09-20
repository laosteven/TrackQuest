<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_STRAVA_CLIENT_ID, PUBLIC_STRAVA_CLIENT_SECRET } from '$env/static/public';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { cn } from '$lib/utils.js';
	import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import { onMount } from 'svelte';
	import { coordinatesStore, filteredCoordinatesStore } from '../../stores/coordinates-store';
	import { stravaInformationStore, stravaToken } from '../../stores/strava-store';
	// @ts-ignore
	import polyline from '@mapbox/polyline';
	import type { DateRange } from 'bits-ui';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { toast } from 'svelte-sonner';

	$: isTypeFilteringOpen = false;
	$: isDateFilteringOpen = false;

	let accessToken = '';
	let stravaData: any[] = [];
	let filteredActivities: any[] = [];
	let types: any[] = [];
	let selectedTypes: any[] = [];
	let dateRange: DateRange = {
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone())
	};
	let fullDateRange: DateRange = {
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone())
	};

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');
			const error = urlParams.get('error');
			if (code) {
				exchangeToken(code);
				toast.success('Success!', {
					description: 'Activities gathered from Strava'
				});
			} else if (error) {
				toast.error('Strava operation aborted');
				goto('/');
			}
		}
	});

	// Function to exchange authorization code for an access token
	async function exchangeToken(code: string) {
		try {
			const response = await fetch('https://www.strava.com/oauth/token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					client_id: PUBLIC_STRAVA_CLIENT_ID,
					client_secret: PUBLIC_STRAVA_CLIENT_SECRET,
					code,
					grant_type: 'authorization_code'
				})
			});
			const data = await response.json();
			accessToken = data.access_token;
			stravaToken.set(data.access_token);

			if (accessToken) {
				fetchStravaActivities();
			}
		} catch (e) {
			toast.error(`Error: ${e}`);
			goto('/');
		}
	}

	async function fetchStravaActivities() {
		stravaData = await fetchActivities();

		fullDateRange = getActivityDateRange(stravaData);
		dateRange = fullDateRange;

		// Display date filtering
		isDateFilteringOpen = true;
	}

	function filterActivities() {
		const coordinates: any[] = [];
		const filteredCoordinates: any[] = [];

		stravaInformationStore.set({
			types,
			selectedTypes,
			fullDateRange,
			dateRange
		});

		goto('/');

		setTimeout(() => {
			stravaData.reverse().forEach((activity) => {
				const decodedPolyline = polyline.decode(activity.map.summary_polyline);
				coordinates.push(decodedPolyline);
			});

			filteredActivities.reverse().forEach((activity) => {
				const decodedPolyline = polyline.decode(activity.map.summary_polyline);
				filteredCoordinates.push(decodedPolyline);
			});

			coordinatesStore.set(coordinates);
			filteredCoordinatesStore.set(filteredCoordinates);

			toast.success('Success!', {
				description: 'Displaying activites from Strava'
			});
		}, 500);
	}

	function getActivityDateRange(activities: any[]) {
		const dates = activities.map((activity) => new Date(activity.start_date));

		const earliestDate = new Date(Math.min(...dates.map((date) => date.getTime())));
		const start = dateToCalendarDate(earliestDate);

		const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));
		const end = dateToCalendarDate(latestDate);

		return { start, end };
	}

	function dateToCalendarDate(date: Date) {
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}

	function getUniqueActivityTypes(activities: any[]) {
		const activityTypes = new Set<string>(); // Using Set to avoid duplicates

		activities.forEach((activity) => {
			if (activity.type) {
				activityTypes.add(activity.type); // Add the type to the set
			}
		});

		return Array.from(activityTypes ?? []); // Convert set to array
	}

	async function fetchActivities(page: number = 1, perPage: number = 30): Promise<any[]> {
		const response = await fetch(
			`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		const data = await response.json();

		// Check if there's a next page
		if (data.length === perPage) {
			return data.concat(await fetchActivities(page + 1, perPage));
		} else {
			return data;
		}
	}

	function onSaveDates() {
		filteredActivities = stravaData.filter((activity) => {
			const currentDate = new Date(activity.start_date_local);
			const calendarDate = dateToCalendarDate(currentDate);

			return (
				dateRange &&
				dateRange.start &&
				calendarDate >= dateRange.start &&
				dateRange.end &&
				calendarDate <= dateRange.end
			);
		});

		types = getUniqueActivityTypes(filteredActivities);

		isDateFilteringOpen = false;
		isTypeFilteringOpen = true;
	}

	function onSaveTypes() {
		filteredActivities = filteredActivities.filter(
			(activity) => selectedTypes.length === 0 || selectedTypes.includes(activity.type)
		);

		isTypeFilteringOpen = false;
		filterActivities();
	}

	function onCancelFiltering() {
		toast.info('Strava operation canceled');
		goto('/');
	}
</script>

<svelte:head>
	<title>TrackQuest</title>
</svelte:head>

<Skeleton class="h-[90vh] w-full" />
<AlertDialog.Root open={isTypeFilteringOpen}>
	<AlertDialog.Content class="max-w-[330px]">
		<AlertDialog.Header>
			<AlertDialog.Title>Activity type</AlertDialog.Title>
			<AlertDialog.Description>Which activity would you like to display?</AlertDialog.Description>
		</AlertDialog.Header>
		{#each types as type}
			<div class="flex flex-row items-start space-x-3">
				<Checkbox
					id={type}
					onCheckedChange={(v) => {
						if (v) {
							selectedTypes = [...selectedTypes, type];
						} else {
							selectedTypes = selectedTypes.filter((i) => i !== i);
						}
					}}
				/>
				<Label for={type}>{type}</Label>
			</div>
		{/each}
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={onCancelFiltering}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onSaveTypes}>Save</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
<AlertDialog.Root open={isDateFilteringOpen}>
	<AlertDialog.Content class="max-w-[330px]">
		<AlertDialog.Header>
			<AlertDialog.Title>Date range</AlertDialog.Title>
			<AlertDialog.Description>Which days would you like to check?</AlertDialog.Description>
		</AlertDialog.Header>
		<div class="grid gap-2">
			<Popover.Root openFocus>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn('justify-start text-left font-normal', !dateRange && 'text-muted-foreground')}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{#if dateRange && dateRange.start}
							{#if dateRange.end}
								{df.format(dateRange.start.toDate(getLocalTimeZone()))} - {df.format(
									dateRange.end.toDate(getLocalTimeZone())
								)}
							{:else}
								{df.format(dateRange.start.toDate(getLocalTimeZone()))}
							{/if}
						{:else if dateRange.start}
							{df.format(dateRange.start.toDate(getLocalTimeZone()))}
						{:else}
							Pick a date
						{/if}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="start">
					<RangeCalendar bind:value={dateRange} initialFocus placeholder={dateRange?.start} />
				</Popover.Content>
			</Popover.Root>
		</div>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={onCancelFiltering}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onSaveDates}>Save</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
