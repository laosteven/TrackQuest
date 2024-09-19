<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';

	import Github from 'lucide-svelte/icons/github';
	import Info from 'lucide-svelte/icons/info';
	import Settings from 'lucide-svelte/icons/settings';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import SquareUser from 'lucide-svelte/icons/square-user';
	import Triangle from 'lucide-svelte/icons/triangle';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { ModeWatcher } from 'mode-watcher';

	import { toggleMode } from 'mode-watcher';
	import ButtonStrava from '../components/button-strava.svelte';
	import ButtonUpload from '../components/button-upload.svelte';
	import DrawerActivities from '../components/drawer-activities.svelte';

	$: isHomePage = $page.url.pathname === '/';
	$: isSettingsPage = $page.url.pathname === '/settings';
	$: isInfoPage = $page.url.pathname === '/info';
</script>

<ModeWatcher />
<DrawerActivities />
<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
	<div class="border-b p-2">
		<Button href="/" variant="outline" size="icon" aria-label="Home">
			<Triangle class="size-5 fill-foreground" />
		</Button>
	</div>
	<nav class="grid gap-1 p-2">
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
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					href="/settings"
					variant="ghost"
					size="icon"
					class="rounded-lg {isSettingsPage ? 'bg-muted' : ''}"
					aria-label="Settings"
					builders={[builder]}
				>
					<Settings class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>Settings</Tooltip.Content>
		</Tooltip.Root>
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
	</nav>
	<nav class="mt-auto grid gap-1 p-2">
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
	</nav>
</aside>

<div class="grid h-screen w-full pl-[57px]">
	<div class="flex flex-col">
		<header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
			<h1 class="text-xl font-semibold">TrackQuest</h1>
			<ButtonUpload />
			<ButtonStrava />
			<Button on:click={toggleMode} variant="outline" size="sm" class="gap-1.5 text-sm">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</header>
		<slot></slot>
	</div>
</div>
