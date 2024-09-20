<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { onSaveSettingsAction, openSettingsDrawer } from '../../stores/settings-store';
	import SettingsConfiguration from '../settings/settings-configuration.svelte';

	let isOpen = false;

	openSettingsDrawer.subscribe((value) => {
		isOpen = value;
	});

	function updateSettings() {
		onSaveSettingsAction.set(true);
	}

	function onCloseSettings() {
		// give time to animate
		setTimeout(() => openSettingsDrawer.set(false), 200);
	}
</script>

<Drawer.Root bind:open={isOpen} onClose={onCloseSettings}>
	<Drawer.Content class="mx-auto max-h-[80vh] sm:max-w-[400px]">
		<Drawer.Header>
			<Drawer.Title>Settings</Drawer.Title>
			<Drawer.Description>Customize your map experience</Drawer.Description>
		</Drawer.Header>
		<SettingsConfiguration />
		<Drawer.Footer>
			<Drawer.Close>
				<Button class="w-full" on:click={updateSettings}>Save</Button>
			</Drawer.Close>
			<Drawer.Close>
				<Button variant="outline" class="w-full">Cancel</Button>
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
