<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_GOOGLE_MAP_API_KEY } from '$env/static/public';
	import { gpxData } from '../stores/gpx-store';
	import { stravaActivities } from '../stores/strava-store';
	import { heroPathStyle } from './heros-path.style';
	// @ts-ignore
	import polyline from '@mapbox/polyline';

	if (browser) {
		let map: google.maps.Map | null = null;
		let animationActive = true;
		let animationPaused = false;
		let animationInterval: number | null = null;
		let flightPlanCoordinates: google.maps.LatLng[] = []; // Store coordinates globally
		let flightPath: google.maps.Polyline | null = null;
		let currentIndex = 0;
		let userHasZoomed = false; // Track if user manually zoomed
		let marker: google.maps.Marker | null = null; // To store the current marker

		const MIN_ZOOM_LEVEL = 2;
		const MAX_ZOOM_LEVEL = 18;

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
						disableDefaultUI: true,
						zoomControl: false,
						streetViewControl: false,
						mapTypeControl: false,
						fullscreenControl: false,
						styles: heroPathStyle
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
				});
		});

		gpxData.subscribe((geojson) => {
			if (geojson && map) {
				clearPreviousData();
				plotGPXData(geojson);
			}
		});

		stravaActivities.subscribe((data) => {
			if (data) {
				plotStravaActivitiesOnMap(data as any[]); // Start with the first activity
			}
		});

		function plotGPXData(geojson: any): void {
			if (!map) return;

			const coordinates = geojson.features[0]?.geometry.coordinates;
			if (coordinates) {
				flightPlanCoordinates = coordinates.map(
					([lng, lat]: [number, number]) => new google.maps.LatLng(lat, lng)
				);

				configurePath();

				startAnimation(() => {});
			}
		}

		function plotStravaActivitiesOnMap(activities: any[]) {
			if (!activities.length) return;
			const activity = activities[0]; // Get the first activity
			const decodedPolyline = polyline.decode(activity.map.summary_polyline);
			const coordinates = decodedPolyline.map(
				([lat, lng]: [number, number]) => new google.maps.LatLng(lat, lng)
			);

			flightPlanCoordinates = coordinates;
			currentIndex = 0;

			configurePath();
			startAnimation(() => {
				// After this activity is animated, animate the next
				plotStravaActivitiesOnMap(activities.slice(1)); // Animate the next activity
			});
		}

		function configurePath() {
			if (!map) return;

			// Create new flight path
			flightPath = new google.maps.Polyline({
				path: [],
				geodesic: true,
				strokeColor: '#4ae5a1',
				strokeOpacity: 0.8,
				strokeWeight: 5
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
					scaledSize: new google.maps.Size(32, 32) // Adjust size
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

			animationInterval = window.setInterval(addNextCoordinate, 20); // Adjust speed with 20ms intervals
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
