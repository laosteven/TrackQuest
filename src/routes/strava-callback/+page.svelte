<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Backend logic for token exchange
		goto('/'); // Redirect to home or another page
	});
</script>

<div>Processing...</div>
