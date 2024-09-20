<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Label from '$lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';
	import {
		activitiesStore,
		activityTypeStore,
		filteredActivitiesStore,
		onActivityFilteringDone,
		onSaveActivityTypeDialog,
		selectedActivityTypeStore
	} from '../../stores/integration-store';

	let activities: any[] = [];
	let filteredActivities: any[] = [];
	let filteredTypes: any[] = [];
	let selectedTypes: any[] = [];

	onMount(() => {
		activities = $activitiesStore;
		filteredActivities = $filteredActivitiesStore;

		// For now, we display the filtered types after the user sets his date range
		filteredTypes = getUniqueActivityTypes($filteredActivitiesStore);

		// But on the settings configuration, we'll display everything
		const types = getUniqueActivityTypes($activitiesStore);

		activityTypeStore.set(types);
	});

	onSaveActivityTypeDialog.subscribe((value) => {
		if (value) {
			onSaveTypes();
		}
	});

	function getUniqueActivityTypes(activities: any[]) {
		const activityTypes = new Set<string>(); // Using Set to avoid duplicates

		activities.forEach((activity) => {
			if (activity.type) {
				activityTypes.add(activity.type); // Add the type to the set
			}
		});

		return Array.from(activityTypes ?? []); // Convert set to array
	}

	function onSaveTypes() {
		filteredActivities = filteredActivities.filter(
			(activity) => selectedTypes.length === 0 || selectedTypes.includes(activity.type)
		);

		filteredActivitiesStore.set(filteredActivities);
		selectedActivityTypeStore.set(selectedTypes);

		// We're done filtering
		// Time to display
		onActivityFilteringDone.set(true);
	}
</script>

{#each filteredTypes as type}
	<div class="flex flex-row items-start space-x-3">
		<Checkbox
			id={type}
			onCheckedChange={(v) => {
				if (v) {
					selectedTypes = [...selectedTypes, type];
				} else {
					selectedTypes = selectedTypes.filter((i) => i !== i);
				}
			}}
		/>
		<Label for={type}>{type}</Label>
	</div>
{/each}
