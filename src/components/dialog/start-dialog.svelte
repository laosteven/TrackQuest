<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { openStartDialog } from '../../stores/integration-store';
	import GpxButton from '../buttons/gpx-button.svelte';
	import StravaButton from '../buttons/strava-button.svelte';

	let isOpen = false;

	openStartDialog.subscribe((value) => {
		isOpen = value;
	});

	function setDialogState(value: boolean) {
		openStartDialog.set(value);
	}
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={setDialogState}>
	<Dialog.Content class="mx-4 max-w-[350px]">
		<Dialog.Header>
			<Dialog.Title>Data source</Dialog.Title>
			<Dialog.Description>Select a data source for activity tracking</Dialog.Description>
		</Dialog.Header>
		<div class="mx-auto grid w-full max-w-sm gap-2 px-2">
			<StravaButton />
			<GpxButton />
		</div>
	</Dialog.Content>
</Dialog.Root>
