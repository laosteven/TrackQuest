<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_STRAVA_CLIENT_ID } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import Zap from 'lucide-svelte/icons/zap';

	let redirectUri = browser ? `${window.location.origin}/strava-callback` : '';
	let stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${PUBLIC_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=activity:read_all`;

	function authenticateStrava() {
		window.location.href = stravaAuthUrl;
	}
</script>

<Button class="w-full gap-1.5" on:click={authenticateStrava}>
	<Zap class="size-3.5" />
	Strava
</Button>
