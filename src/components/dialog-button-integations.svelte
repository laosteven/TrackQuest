<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Plug from 'lucide-svelte/icons/plug';
	import ButtonStrava from './button-strava.svelte';
	import ButtonUpload from './button-upload.svelte';

	let isOpen = false;

	function closeDialog() {
		isOpen = false;
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="ml-auto">
		<Button size="sm" class="gap-1.5 text-sm">
			<Plug class="size-3.5" />
			Start
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="mx-4 max-w-[350px]">
		<Dialog.Header>
			<Dialog.Title>Data source</Dialog.Title>
			<Dialog.Description>Select a data source for activity tracking</Dialog.Description>
		</Dialog.Header>
		<div class="mx-auto grid w-full max-w-sm gap-2 px-2">
			<ButtonStrava />
			<ButtonUpload on:done={closeDialog} />
		</div>
	</Dialog.Content>
</Dialog.Root>
