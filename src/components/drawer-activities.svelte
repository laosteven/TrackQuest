<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { drawerOpen } from '../stores/drawer-store';
	import { stravaActivities } from '../stores/strava-store';

	let stravaData: string | any[] = [];
	let isOpen = false;

	stravaActivities.subscribe((data) => {
		if (data) {
			stravaData = data;
		}
	});

	drawerOpen.subscribe((value) => {
		isOpen = value;
	});

	function closeDrawer() {
		drawerOpen.set(false);
	}
</script>

<Drawer.Root open={isOpen} on:close={closeDrawer}>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header class="max-h-[40vh]">
				<Drawer.Title>Strava</Drawer.Title>
				<Drawer.Description>Your activities</Drawer.Description>
				{#if stravaData.length > 0}
					<ScrollArea class="h-60 py-4">
						{#each stravaData as activity}
							<div class="text-sm">
								{activity.name} - {new Date(activity.start_date).toLocaleDateString()}
							</div>
							<Separator class="my-2" />
						{/each}
					</ScrollArea>
				{/if}
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} variant="outline">Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
