<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { drawerOpen } from '../stores/drawer-store';

	let isOpen = false;

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
				<Drawer.Title></Drawer.Title>
				<Drawer.Description></Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} variant="outline">Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
