<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_GOOGLE_MAP_API_KEY } from '$env/static/public';
	import { mode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { darkTheme } from '../../map-themes/dark.style';
	import { heroPathStyle } from '../../map-themes/heros-path.style';
	import { lightTheme } from '../../map-themes/light.style';
	import { filteredCoordinatesStore } from '../../stores/integration-store';
	import { settingsConfigurationStore } from '../../stores/settings-store';

	if (browser) {
		let map: google.maps.Map | null = null;
		let activities: any[] = [];
		let animationActive = true;
		let animationPaused = false;
		let animationInterval: number | null = null;
		let flightPlanCoordinates: google.maps.LatLng[] = []; // Store coordinates globally
		let flightPath: google.maps.Polyline | null = null;
		let currentIndex = 0;
		let userHasZoomed = false; // Track if user manually zoomed
		let marker: google.maps.Marker | null = null; // To store the current marker

		let theme =
			$mode === 'light'
				? { value: 'light', label: 'Skyward Haven' }
				: { value: 'dark', label: 'Depths Abyss' };
		let speedAnimation = 20;
		let strokeWeight = 5;
		let strokeColor = '#4ae5a1';
		let strokeOpacity = 0.8;
		let markerSize = 32;

		const MIN_ZOOM_LEVEL = 2;
		const MAX_ZOOM_LEVEL = 18;
		const themes = {
			light: lightTheme,
			dark: darkTheme,
			hero: heroPathStyle
		};

		settingsConfigurationStore.subscribe((settings) => {
			updateMapStyle(settings.theme);
			speedAnimation = settings.speedAnimation;
			strokeWeight = settings.strokeWeight;
			strokeColor = settings.strokeColor;
			strokeOpacity = settings.strokeOpacity;
			markerSize = settings.markerSize;

			clearInterval(animationInterval ?? '');
			plotActivitiesOnMap();
		});

		filteredCoordinatesStore.subscribe((coordinates) => {
			if (coordinates) {
				clearPreviousData();
				clearInterval(animationInterval ?? '');
				activities = coordinates;
				plotActivitiesOnMap();
			}
		});

		onMount(() => {
			createMap();
		});

		function createMap() {
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
							maxZoom: MAX_ZOOM_LEVEL,
							zoomControl: false,
							streetViewControl: false,
							mapTypeControl: false,
							styles: themes[theme.value as keyof typeof themes]
						});

						configurePath();

						// Stop the animation when the user zooms or drags the map
						// google.maps.event.addListener(map, 'zoom_changed', () => {
						// 	userHasZoomed = true; // Mark that the user manually zoomed
						// 	stopAnimation();
						// });
						// google.maps.event.addListener(map, 'dragstart', stopAnimation);

						// // Resume the animation when user interaction ends (idle event)
						// google.maps.event.addListener(map, 'idle', resumeAnimation);
					})
					.catch((e) => {
						console.error(e);
						toast.error('Error loading the map: ', e);
					});
			});
		}

		function updateMapStyle(newTheme: { value: string; label: string }) {
			if (map && theme.value !== newTheme.value) {
				theme = newTheme;
				createMap();
			}
		}

		function plotActivitiesOnMap() {
			if (!activities.length) return;
			const activity = activities[0]; // Get the first activity
			const coordinates = activity.map(
				([lat, lng]: [number, number]) => new google.maps.LatLng(lat, lng)
			);

			flightPlanCoordinates = coordinates;
			currentIndex = 0;

			configurePath();
			startAnimation(() => {
				activities = activities.slice(1);
				plotActivitiesOnMap();
			});
		}

		function configurePath() {
			if (!map) return;

			// Create new flight path
			flightPath = new google.maps.Polyline({
				path: [],
				geodesic: true,
				strokeColor,
				strokeOpacity,
				strokeWeight
			});

			flightPath.setMap(map);

			// Clear previous marker if it exists
			if (marker) marker.setMap(null);

			// Initialize the marker to follow the most recent coordinate
			marker = new google.maps.Marker({
				position: flightPlanCoordinates[0], // Start at the first point
				map: map,
				icon: {
					url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Custom icon
					scaledSize: new google.maps.Size(markerSize, markerSize) // Adjust size
				}
			});
		}

		// Start the animation from the current index
		function startAnimation(onComplete: () => void): void {
			let bounds = new google.maps.LatLngBounds();

			function addNextCoordinate(): void {
				if (!map) return;

				if (!animationActive || currentIndex >= flightPlanCoordinates.length) {
					clearInterval(animationInterval ?? '');
					onComplete(); // Move to the next activity
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

				marker?.setPosition(flightPlanCoordinates[currentIndex]);
				map.setCenter(flightPlanCoordinates[currentIndex]);
				currentIndex++;
			}

			animationInterval = window.setInterval(addNextCoordinate, speedAnimation);
		}

		// Clear previous animation data when a new file is uploaded
		function clearPreviousData(): void {
			currentIndex = 0; // Reset index
			flightPlanCoordinates = []; // Clear old coordinates
			userHasZoomed = false; // Reset zoom flag

			// Clear the marker from the map
			if (marker) {
				marker.setMap(null); // Remove the previous marker
				marker = null;
			}

			if (flightPath) {
				flightPath.setMap(null); // Remove old path from the map
				flightPath = null;
			}
		}

		function stopAnimation(): void {
			animationActive = false;
			animationPaused = true; // Mark animation as paused
			if (animationInterval) {
				clearInterval(animationInterval);
			}
		}

		// Resume the animation if paused
		function resumeAnimation(): void {
			if (animationPaused) {
				animationActive = true;
				animationPaused = false;
				startAnimation(() => {}); // Resume the animation
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
