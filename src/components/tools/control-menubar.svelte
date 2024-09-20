<script lang="ts">
	import '../app.css';

	import Play from 'lucide-svelte/icons/play';
	import Rotate from 'lucide-svelte/icons/rotate-ccw';
	import Trash from 'lucide-svelte/icons/trash-2';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Menubar from '$lib/components/ui/menubar';
</script>

<Menubar.Root class="ml-auto h-[36px]">
	<Menubar.Menu>
		<Button class="h-[28px]" size="sm" variant="ghost"><Play class="mr-2 h-4 w-4" /> Play</Button>
		<Button class="h-[28px]" size="sm" variant="ghost"
			><Rotate class="mr-2 h-4 w-4" />Restart</Button
		>
		<Button class="h-[28px]" size="sm" variant="ghost"><Trash class="mr-2 h-4 w-4" />Clear</Button>
	</Menubar.Menu>
</Menubar.Root>
