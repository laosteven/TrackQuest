<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Settings from 'lucide-svelte/icons/settings';
	import { openSettingsDrawer } from '../../stores/settings-store';

	function onClickSettings() {
		openSettingsDrawer.set(true);
	}
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="ghost"
			size="icon"
			class="rounded-lg"
			aria-label="Settings"
			builders={[builder]}
			on:click={onClickSettings}
		>
			<Settings class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Settings</Tooltip.Content>
</Tooltip.Root>
