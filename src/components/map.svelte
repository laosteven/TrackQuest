<script>
	import { onMount } from 'svelte';

	let map;

	onMount(() => {
		// const script = document.createElement('script');
		// script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
		// script.async = true;
		// script.defer = true;
		// window.initMap = initMap;
		// document.body.appendChild(script);
	});

	function initMap() {
		// map = new google.maps.Map(document.getElementById('map'), {
		// 	center: { lat: 45.5017, lng: -73.5673 }, // Example coordinates (Montreal)
		// 	zoom: 12
		// });
	}
</script>

<div id="map"></div>

<style>
	/* #map {
		height: 400px;
		width: 100%;
	} */
</style>
