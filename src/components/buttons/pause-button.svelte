<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Pause from 'lucide-svelte/icons/circle-pause';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" class="rounded-lg" aria-label="Pause" builders={[builder]}>
			<Pause class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Pause</Tooltip.Content>
</Tooltip.Root>
