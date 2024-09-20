<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Play from 'lucide-svelte/icons/circle-play';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" class="rounded-lg" aria-label="Play" builders={[builder]}>
			<Play class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Play</Tooltip.Content>
</Tooltip.Root>
