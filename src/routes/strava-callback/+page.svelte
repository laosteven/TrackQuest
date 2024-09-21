<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_STRAVA_CLIENT_ID, PUBLIC_STRAVA_CLIENT_SECRET } from '$env/static/public';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';
	import {
		activitiesStore,
		filteredActivitiesStore,
		filteredCoordinatesStore,
		onActivityFilteringDone,
		openDateRangeDialog,
		unfilteredCoordinatesStore
	} from '../../stores/integration-store';
	import { stravaTokenStore } from '../../stores/strava-store';
	// @ts-ignore
	import polyline from '@mapbox/polyline';
	import { toast } from 'svelte-sonner';

	let accessToken = '';

	onActivityFilteringDone.subscribe((isDone) => {
		if (isDone) {
			filterActivities();
		}
	});

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');
			const error = urlParams.get('error');
			if (code) {
				exchangeToken(code);
				toast.success('Success!', {
					description: 'Filtering activities'
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
			stravaTokenStore.set(data.access_token);

			if (accessToken) {
				console.log('Athlete authorized');
				fetchStravaActivities();
			}
		} catch (e) {
			toast.error(`Strava error: ${e}`);
			browser && goto('/');
		}
	}

	async function deauthorizeAthlete() {
		const response = await fetch('https://www.strava.com/oauth/deauthorize', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			console.log('Athlete successfully deauthorized');
			stravaTokenStore.set(null);
		} else {
			const errorData = await response.json();
			console.error('Error deauthorizing athlete:', errorData);
		}
	}

	async function fetchStravaActivities() {
		const activities = await fetchActivities();

		// After fetching, deauthorize
		// We're limited to 1 athlete only
		await deauthorizeAthlete();

		activitiesStore.set(activities);
		openDateRangeDialog.set(true);
	}

	function filterActivities() {
		const coordinates: any[] = [];
		const filteredCoordinates: any[] = [];

		// Preload the map first
		browser && goto('/');

		// Then set the coordinates
		setTimeout(() => {
			$activitiesStore?.reverse().forEach((activity) => {
				const decodedPolyline = polyline.decode(activity.map.summary_polyline);
				coordinates.push(decodedPolyline);
			});

			$filteredActivitiesStore?.reverse().forEach((activity) => {
				const decodedPolyline = polyline.decode(activity.map.summary_polyline);
				filteredCoordinates.push(decodedPolyline);
			});

			unfilteredCoordinatesStore.set(coordinates);
			filteredCoordinatesStore.set(filteredCoordinates);

			toast.success('Success!', {
				description: 'Displaying activites from Strava'
			});
		}, 500);
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
</script>

<svelte:head>
	<title>TrackQuest | Filtering ...</title>
</svelte:head>

<Skeleton class="h-[90vh] w-full" />
