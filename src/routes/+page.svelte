<script lang="ts">
	import Map from '../components/tools/map.svelte';
</script>

<svelte:head>
	<title>TrackQuest</title>
</svelte:head>

<main class="grid flex-1 gap-4 overflow-auto">
	<div class="relative flex-col items-start gap-8 md:flex">
		<Map></Map>
	</div>
</main>
