<script lang="ts">
	import SquareUser from 'lucide-svelte/icons/square-user';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			variant="ghost"
			size="icon"
			class="mt-auto rounded-lg"
			aria-label="Account"
			builders={[builder]}
			disabled
		>
			<SquareUser class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Account</Tooltip.Content>
</Tooltip.Root>
