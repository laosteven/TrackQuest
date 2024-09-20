<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import { cn } from '$lib/utils.js';
	import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import { onMount } from 'svelte';
	import {
		activitiesStore,
		dateRangeStore,
		filteredActivitiesStore,
		onSaveDateRangeAction,
		openActivityTypeDialog
	} from '../../stores/integration-store';
	// @ts-ignore
	import type { DateRange } from 'bits-ui';
	import CalendarIcon from 'lucide-svelte/icons/calendar';

	let activities: any[] = $activitiesStore;
	let filteredActivities: any[] = [];
	let dateRange: DateRange = {
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone())
	};

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	onSaveDateRangeAction.subscribe((isSaving) => {
		if (isSaving) {
			onSaveDates();
			openActivityTypeDialog.set(true);
		}
	});

	onMount(() => {
		dateRange = getActivityDateRange();
		dateRangeStore.set(dateRange);
	});

	function getActivityDateRange() {
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

	function onSaveDates() {
		filteredActivities = activities.filter((activity) => {
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

		filteredActivitiesStore.set(filteredActivities);
	}
</script>

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
