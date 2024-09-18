<script lang="ts">
	import Map from '../components/map.svelte';
</script>

<svelte:head>
	<title>Athlete's Path</title>
</svelte:head>

<main class="grid flex-1 gap-4 overflow-auto">
	<div class="relative flex-col items-start gap-8 md:flex">
		<Map></Map>
	</div>
</main>
