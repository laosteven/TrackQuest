<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';

	import { mode, toggleMode } from 'mode-watcher';
	import { settingsConfigurationStore } from '../../stores/settings-store';

	function onClickToggle() {
		toggleMode();
		const theme =
			$mode === 'light'
				? { value: 'light', label: 'Skyward Haven' }
				: { value: 'dark', label: 'Depths Abyss' };
		settingsConfigurationStore.update((currentSettings) => ({
			...currentSettings,
			theme
		}));
	}
</script>

<Button on:click={onClickToggle} variant="outline" size="sm" class="gap-1.5 text-sm">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
