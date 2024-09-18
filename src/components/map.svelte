<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_GOOGLE_MAP_API_KEY } from '$env/static/public';

	if (browser) {
		import('@googlemaps/js-api-loader').then((pkg) => {
			const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

			const { Loader } = pkg;
			const loader = new Loader({
				apiKey: PUBLIC_GOOGLE_MAP_API_KEY,
				version: 'weekly'
			});

			loader
				.importLibrary('maps')
				.then(({ Map }) => {
					new Map(document.getElementById('map') as HTMLElement, {
						center: { lat: -34.397, lng: 150.644 },
						zoom: 8
					});
				})
				.catch((e) => {
					// do something
				});
		});
	}
</script>

<div id="map"></div>

<style>
	#map {
		height: 100%;
		width: 100%;
	}
</style>
