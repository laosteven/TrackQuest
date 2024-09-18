<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	import Github from 'lucide-svelte/icons/github';
	import Import from 'lucide-svelte/icons/import';
	import Info from 'lucide-svelte/icons/info';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Share from 'lucide-svelte/icons/share';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import SquareUser from 'lucide-svelte/icons/square-user';
	import Triangle from 'lucide-svelte/icons/triangle';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	$: isHomePage = $page.url.pathname === '/';
	$: isAboutPage = $page.url.pathname === '/about';
	$: isHelpPage = $page.url.pathname === '/help';
</script>

<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
	<div class="border-b p-2">
		<Button href="/" variant="outline" size="icon" aria-label="Home">
			<Triangle class="size-5 fill-foreground" />
		</Button>
	</div>
	<nav class="grid gap-1 p-2">
		<Tooltip.Root>
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
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					href="/about"
					variant="ghost"
					size="icon"
					class="rounded-lg {isAboutPage ? 'bg-muted' : ''}"
					aria-label="About"
					builders={[builder]}
				>
					<Info class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>About</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					href="/help"
					variant="ghost"
					size="icon"
					class="rounded-lg {isHelpPage ? 'bg-muted' : ''}"
					aria-label="Help"
					builders={[builder]}
				>
					<LifeBuoy class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>Help</Tooltip.Content>
		</Tooltip.Root>
	</nav>
	<nav class="mt-auto grid gap-1 p-2">
		<Tooltip.Root>
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
		<Tooltip.Root>
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
	</nav>
</aside>

<div class="grid h-screen w-full pl-[53px]">
	<div class="flex flex-col">
		<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
			<h1 class="text-xl font-semibold">Athlete's Path</h1>
			<Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
				<Import class="size-3.5" />
				Import
			</Button>
			<Button disabled variant="outline" size="sm" class="gap-1.5 text-sm">
				<Share class="size-3.5" />
				Share
			</Button>
		</header>
		<slot></slot>
	</div>
</div>
