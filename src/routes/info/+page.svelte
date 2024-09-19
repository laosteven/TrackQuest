<script lang="ts">
	import { stravaActivities } from '../../stores/strava-store';

	let stravaData: string | any[] = [];

	stravaActivities.subscribe((data) => {
		if (data) {
			stravaData = data;
		}
	});
</script>

<svelte:head>
	<title>TrackQuest | Info</title>
</svelte:head>

<main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
	<div class="relative flex-col items-start gap-8 md:flex">
		Info

		<!-- Display data once fetched -->
		{#if stravaData.length > 0}
			<div>
				<h2>Your Strava Activities</h2>
				<ul>
					{#each stravaData as activity}
						<li>{activity.name} - {new Date(activity.start_date).toLocaleDateString()}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</main>
