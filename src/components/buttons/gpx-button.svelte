<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	// @ts-ignore
	import toGeoJSON from '@mapbox/togeojson';
	import Import from 'lucide-svelte/icons/import';
	import { toast } from 'svelte-sonner';
	import { filteredCoordinatesStore, openStartDialog } from '../../stores/integration-store';

	const { gpx } = toGeoJSON;
	let fileInput: HTMLInputElement | null = null;

	function handleFileUpload(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files && files.length > 0) {
			const fileReaders: Promise<any>[] = [];

			// Loop through each file
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();

				// Create a promise for each file read operation
				const fileReadPromise = new Promise((resolve, reject) => {
					reader.onload = (e: ProgressEvent<FileReader>) => {
						const xmlString = e.target?.result as string;
						const parser = new DOMParser();
						const xml = parser.parseFromString(xmlString, 'application/xml');

						// Convert GPX to GeoJSON
						const geojson = gpx(xml);
						geojson.features.forEach((feature: any) => {
							if (feature.geometry && feature.geometry.coordinates) {
								try {
									feature.geometry.coordinates = feature.geometry.coordinates.map(
										([lng, lat]: [number, number]) => [lat, lng] // Swap lat and lng
									);
								} catch (e: any) {
									toast.error('Could not read the file(s)');
									throw Error('Reading error', e);
								}
							}
						});
						const coordinates = geojson.features[0]?.geometry.coordinates;
						resolve(coordinates); // Resolve the promise with the geojson data
					};

					reader.onerror = reject;
					reader.readAsText(file);
				});

				fileReaders.push(fileReadPromise);
			}

			// Once all files are read, update the store
			Promise.all(fileReaders)
				.then((allCoordinates) => {
					// You can combine or handle multiple geojson objects as needed
					filteredCoordinatesStore.set(allCoordinates);

					toast.success('Success!', {
						description: 'Displaying activites from GPX file(s)'
					});

					// Close start dialog
					openStartDialog.set(false);

					// Clean up
					target.value = '';
				})
				.catch(() => {
					toast.error('Could not read the file(s)');
				});
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
	multiple
/>

<Button variant="outline" class="w-full gap-1.5" on:click={triggerFileUpload}>
	<Import class="size-3.5" />
	GPX files
</Button>
