<script lang="ts">
	import Triangle from 'lucide-svelte/icons/triangle';

	import { Button } from '$lib/components/ui/button/index.js';

	import GithubButton from '../buttons/github-button.svelte';
	import HomeButton from '../buttons/home-button.svelte';
	import InfoButton from '../buttons/info-button.svelte';
	import AccountButton from '../buttons/login-button.svelte';
	import SettingsButton from '../buttons/settings-button.svelte';
</script>

<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
	<div class="border-b p-2">
		<Button href="/" variant="outline" size="icon" aria-label="Home">
			<Triangle class="size-5 fill-foreground" />
		</Button>
	</div>
	<nav class="grid gap-1 p-2">
		<HomeButton />
		<SettingsButton />
		<InfoButton />
	</nav>
	<nav class="mt-auto grid gap-1 p-2">
		<GithubButton />
		<AccountButton />
	</nav>
</aside>
