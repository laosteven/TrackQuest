<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { PUBLIC_STRAVA_CLIENT_ID, PUBLIC_STRAVA_CLIENT_SECRET } from '$env/static/public';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';
	import { coordinatesStore } from '../../stores/coordinates-store';
	import { stravaToken } from '../../stores/strava-store';
	// @ts-ignore
	import polyline from '@mapbox/polyline';
	import { toast } from 'svelte-sonner';

	let accessToken = '';
	let stravaData: string | any[] = [];

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');
			const error = urlParams.get('error');
			if (code) {
				exchangeToken(code);
				toast.success('Success!', {
					description: 'Displaying activities from Strava'
				});
			} else if (error) {
				toast.error('Connection failed');
			}

			goto('/');
		}

		// Function to exchange authorization code for an access token
		async function exchangeToken(code: string) {
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
		}

		async function fetchStravaActivities() {
			const coordinates: any[] = [];
			stravaData = await fetchActivities();

			stravaData.reverse().forEach((activity) => {
				const decodedPolyline = polyline.decode(activity.map.summary_polyline);
				coordinates.push(decodedPolyline);
			});

			coordinatesStore.set(coordinates);
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
	});
</script>

<Skeleton class="h-full w-full" />
