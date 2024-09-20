<script lang="ts">
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { onSaveActivityTypeDialog, openActivityTypeDialog } from '../../stores/integration-store';
	// @ts-ignore
	import { toast } from 'svelte-sonner';
	import ActivityTypeFilter from '../tools/activity-type-filter.svelte';

	let isOpen = false;

	openActivityTypeDialog.subscribe((value) => {
		isOpen = value;
	});

	function onSaveTypes() {
		onSaveActivityTypeDialog.set(true);
	}

	function onCancelFiltering() {
		toast.info('Strava operation canceled');
		goto('/');
	}
</script>

<AlertDialog.Root open={isOpen}>
	<AlertDialog.Content class="max-w-[330px]">
		<AlertDialog.Header>
			<AlertDialog.Title>Activity type</AlertDialog.Title>
			<AlertDialog.Description>Which activity would you like to display?</AlertDialog.Description>
		</AlertDialog.Header>
		<ActivityTypeFilter />
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={onCancelFiltering}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onSaveTypes}>Save</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
