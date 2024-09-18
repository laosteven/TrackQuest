<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	// @ts-ignore
	import toGeoJSON from '@mapbox/togeojson';
	import Import from 'lucide-svelte/icons/import';
	import { gpxData } from '../stores/gpx-store';

	const { gpx } = toGeoJSON;
	let fileInput: HTMLInputElement | null = null;

	function handleFileUpload(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const xmlString = e.target?.result as string;
				const parser = new DOMParser();
				const xml = parser.parseFromString(xmlString, 'application/xml');

				// Convert GPX to GeoJSON and store it
				const geojson = gpx(xml);
				gpxData.set(geojson); // Set the GPX data in the store

				// Clean up
				target.value = '';
			};
			reader.readAsText(file);
		}
	}

	function triggerFileUpload(): void {
		fileInput?.click();
	}
</script>

<!-- File input (hidden) -->
<input
	type="file"
	accept=".gpx"
	bind:this={fileInput}
	on:change={handleFileUpload}
	style="display: none;"
/>

<Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm" on:click={triggerFileUpload}>
	<Import class="size-3.5" />
	Upload
</Button>
