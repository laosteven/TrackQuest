<script lang="ts">
	import { page } from '$app/stores';

	import Info from 'lucide-svelte/icons/info';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	$: isInfoPage = $page.url.pathname === '/info';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			href="/info"
			variant="ghost"
			size="icon"
			class="rounded-lg {isInfoPage ? 'bg-muted' : ''}"
			aria-label="Info"
			builders={[builder]}
		>
			<Info class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Info</Tooltip.Content>
</Tooltip.Root>
