<script lang="ts">
	import GoogleMaps from '../components/tools/google-maps.svelte';
</script>

<svelte:head>
	<title>TrackQuest</title>
</svelte:head>

<main class="grid flex-1 gap-4 overflow-auto">
	<div class="relative flex-col items-start gap-8 md:flex">
		<GoogleMaps></GoogleMaps>
	</div>
</main>
