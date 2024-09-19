<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_STRAVA_CLIENT_ID, PUBLIC_STRAVA_CLIENT_SECRET } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import Zap from 'lucide-svelte/icons/zap';
	import { onMount } from 'svelte';
	import { stravaActivities, stravaToken } from '../stores/strava-store';

	let redirectUri = browser ? `${window.location.origin}/strava-callback` : '';
	let stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${PUBLIC_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=activity:read_all`;

	let accessToken = '';
	let stravaData: string | any[] = [];

	// Check if we have a code in the URL (after redirect)
	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');
			if (code) {
				exchangeToken(code);
			}
		}
	});

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
		stravaData = await fetchActivities();
		stravaActivities.set(stravaData.reverse());
		// drawerOpen.set(true);
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

	function authenticateStrava() {
		window.location.href = stravaAuthUrl;
	}
</script>

<Button variant="outline" size="sm" class="gap-1.5 text-sm" on:click={authenticateStrava}>
	<Zap class="size-3.5" />
	Strava
</Button>
