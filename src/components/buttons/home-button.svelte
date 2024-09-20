<script lang="ts">
	import { page } from '$app/stores';

	import SquareTerminal from 'lucide-svelte/icons/square-terminal';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	$: isHomePage = $page.url.pathname === '/';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			href="/"
			variant="ghost"
			size="icon"
			class="rounded-lg {isHomePage ? 'bg-muted' : ''}"
			aria-label="Home"
			builders={[builder]}
		>
			<SquareTerminal class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Home</Tooltip.Content>
</Tooltip.Root>
