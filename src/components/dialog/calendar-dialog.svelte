<script lang="ts">
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { onSaveDateRangeAction, openDateRangeDialog } from '../../stores/integration-store';
	// @ts-ignore
	import { toast } from 'svelte-sonner';
	import CalendarRangeFilter from '../tools/calendar-range-filter.svelte';

	let isOpen = false;

	openDateRangeDialog.subscribe((value) => {
		isOpen = value;
	});

	function onSaveDates() {
		onSaveDateRangeAction.set(true);
	}

	function onCancelFiltering() {
		toast.info('Strava operation canceled');
		goto('/');
	}
</script>

<AlertDialog.Root open={isOpen}>
	<AlertDialog.Content class="max-w-[330px]">
		<AlertDialog.Header>
			<AlertDialog.Title>Date range</AlertDialog.Title>
			<AlertDialog.Description>Which days would you like to check?</AlertDialog.Description>
		</AlertDialog.Header>
		<CalendarRangeFilter />
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={onCancelFiltering}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onSaveDates}>Save</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
