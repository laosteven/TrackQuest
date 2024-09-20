<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import Plug from 'lucide-svelte/icons/plug';
	import ButtonStrava from './button-strava.svelte';
	import ButtonUpload from './button-upload.svelte';

	let isOpen = false;

	function closeDrawer() {
		isOpen = false;
	}
</script>

<Drawer.Root bind:open={isOpen}>
	<Drawer.Trigger class="ml-auto">
		<Button size="sm" class="gap-1.5 text-sm">
			<Plug class="size-3.5" />
			Start
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="mx-auto sm:max-w-[400px]">
		<Drawer.Header>
			<Drawer.Title>Integrations</Drawer.Title>
			<Drawer.Description
				>Select which options would you like to use to trace your path</Drawer.Description
			>
		</Drawer.Header>
		<div class="mx-auto grid w-full max-w-sm gap-2 px-2">
			<ButtonStrava />
			<ButtonUpload on:done={closeDrawer} />
		</div>
		<Drawer.Footer>
			<Drawer.Close>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
