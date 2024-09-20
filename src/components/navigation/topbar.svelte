<script lang="ts">
	import StartButton from '../buttons/start-button.svelte';
	import ThemeModeButton from '../buttons/theme-mode-button.svelte';
</script>

<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
	<h1 class="text-xl font-semibold">TrackQuest</h1>
	<StartButton />
	<ThemeModeButton />
</header>
