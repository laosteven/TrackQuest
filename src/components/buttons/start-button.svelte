<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Plug from 'lucide-svelte/icons/plug';
	import { openStartDialog } from '../../stores/integration-store';

	function onClickStart() {
		openStartDialog.set(true);
	}
</script>

<Button size="sm" class="ml-auto gap-1.5 text-sm" on:click={onClickStart}>
	<Plug class="size-3.5" />
	Start
</Button>
