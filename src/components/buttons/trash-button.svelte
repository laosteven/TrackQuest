<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Trash from 'lucide-svelte/icons/trash-2';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" class="rounded-lg" aria-label="Trash" builders={[builder]}>
			<Trash class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Trash</Tooltip.Content>
</Tooltip.Root>
