<script lang="ts">
	import SquareUser from 'lucide-svelte/icons/square-user';

	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	$: isLoginPage = $page.url.pathname === '/login';
</script>

<Tooltip.Root openDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<Button
			href="/login"
			variant="ghost"
			size="icon"
			class="rounded-lg {isLoginPage ? 'bg-muted' : ''}"
			aria-label="Account"
			builders={[builder]}
		>
			<SquareUser class="size-5" />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content side="right" sideOffset={5}>Login</Tooltip.Content>
</Tooltip.Root>
