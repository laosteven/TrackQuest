<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Restart from 'lucide-svelte/icons/rotate-ccw';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="ghost"
			size="icon"
			class="rounded-lg"
			aria-label="Restart"
			builders={[builder]}
		>
			<Restart class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Restart</Tooltip.Content>
</Tooltip.Root>
