<script lang="ts">
	import Github from 'lucide-svelte/icons/github';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			href="https://github.com/laosteven/verbose-spoon"
			variant="ghost"
			size="icon"
			class="mt-auto rounded-lg"
			aria-label="GitHub"
			builders={[builder]}
			target="_blank"
		>
			<Github class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>GitHub</Tooltip.Content>
</Tooltip.Root>
