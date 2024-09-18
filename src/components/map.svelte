<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_GOOGLE_MAP_API_KEY } from '$env/static/public';
	import { gpxData } from '../stores/gpx-store';

	if (browser) {
		let map: google.maps.Map | null = null;
		let animationActive = true;
		let animationPaused = false;
		let animationInterval: number | null = null;
		let flightPlanCoordinates: google.maps.LatLng[] = []; // Store coordinates globally
		let flightPath: google.maps.Polyline | null = null;
		let currentIndex = 0;
		let userHasZoomed = false; // Track if user manually zoomed

		const MIN_ZOOM_LEVEL = 2;
		const MAX_ZOOM_LEVEL = 18;
		const MAX_INDEX_FOR_ZOOM = 20;

		import('@googlemaps/js-api-loader').then((pkg) => {
			const { Loader } = pkg;
			const loader = new Loader({
				apiKey: PUBLIC_GOOGLE_MAP_API_KEY,
				version: 'weekly'
			});

			loader
				.importLibrary('maps')
				.then(({ Map }) => {
					map = new Map(document.getElementById('map') as HTMLElement, {
						center: { lat: 0, lng: 0 },
						zoom: MIN_ZOOM_LEVEL,
						minZoom: MIN_ZOOM_LEVEL,
						maxZoom: MAX_ZOOM_LEVEL
					});

					// Stop the animation when the user zooms or drags the map
					google.maps.event.addListener(map, 'zoom_changed', () => {
						userHasZoomed = true; // Mark that the user manually zoomed
						stopAnimation();
					});
					google.maps.event.addListener(map, 'dragstart', stopAnimation);

					// Resume the animation when user interaction ends (idle event)
					google.maps.event.addListener(map, 'idle', resumeAnimation);
				})
				.catch((e) => {
					console.error(e);
				});
		});

		gpxData.subscribe((geojson) => {
			if (geojson && map) {
				restartAnimation(geojson); // Restart animation when new file is uploaded
			}
		});

		// Restart the animation when a new GPX file is uploaded
		function restartAnimation(geojson: any): void {
			stopAnimation(); // Stop any existing animation
			clearPreviousData(); // Clear previous animation data
			plotGPXData(geojson); // Plot new GPX data
		}

		// Plot GPX data on the map
		function plotGPXData(geojson: any): void {
			if (!map) return;

			const coordinates = geojson.features[0]?.geometry.coordinates;
			if (coordinates) {
				flightPlanCoordinates = coordinates.map(
					([lng, lat]: [number, number]) => new google.maps.LatLng(lat, lng)
				);

				flightPath = new google.maps.Polyline({
					path: [],
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 2
				});

				flightPath.setMap(map);

				startAnimation();
			}
		}

		// Start the animation from the current index
		function startAnimation(): void {
			let bounds = new google.maps.LatLngBounds();

			function addNextCoordinate(): void {
				if (!map) return;

				if (!animationActive || currentIndex >= flightPlanCoordinates.length) {
					clearInterval(animationInterval ?? '');
					return;
				}

				const newPath = flightPath?.getPath();
				newPath?.push(flightPlanCoordinates[currentIndex]);
				bounds.extend(flightPlanCoordinates[currentIndex]);

				if (!userHasZoomed) {
					// Only auto-zoom if the user hasn't zoomed manually
					map?.fitBounds(bounds);
					const zoomLevel = Math.max(
						Math.min(map?.getZoom() || MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL),
						MIN_ZOOM_LEVEL
					);
					map?.setZoom(zoomLevel);
				}

				map.setCenter(flightPlanCoordinates[currentIndex - 1]);
				currentIndex++;
			}

			animationInterval = window.setInterval(addNextCoordinate, 20); // Adjust speed with 20ms intervals
		}

		function stopAnimation(): void {
			animationActive = false;
			animationPaused = true; // Mark animation as paused
			if (animationInterval) {
				clearInterval(animationInterval);
			}
		}

		// Clear previous animation data when a new file is uploaded
		function clearPreviousData(): void {
			currentIndex = 0; // Reset index
			flightPlanCoordinates = []; // Clear old coordinates
			userHasZoomed = false; // Reset zoom flag

			if (flightPath) {
				flightPath.setMap(null); // Remove old path from the map
				flightPath = null;
			}
		}

		// Resume the animation if paused
		function resumeAnimation(): void {
			if (animationPaused) {
				animationActive = true;
				animationPaused = false;
				startAnimation(); // Resume the animation from where it left off
			}
		}
	}
</script>

<div id="map"></div>

<style>
	#map {
		height: 100%;
		width: 100%;
	}
</style>
