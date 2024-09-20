<script lang="ts">
</script>

<svelte:head>
	<title>TrackQuest | Info</title>
</svelte:head>

<main class="grid flex-1 gap-4 overflow-auto p-4">
	<div class="relative flex-col items-start gap-8 md:flex">
		<div>
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">TrackQuest</h1>
			<p class="leading-7 [&:not(:first-child)]:mt-4">
				TrackQuest is an app designed to help you visualize and track your athletic activities, from
				running to cycling, with support for GPX file uploads and 3rd party integrations.
			</p>
			<h2
				class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Key features
			</h2>
			<p class="leading-7 [&:not(:first-child)]:mt-4">
				Whether you want to track your performance, upload routes, or customize your map experience,
				TrackQuest has you covered:
			</p>
			<ul class="my-6 ml-6 list-disc [&>li]:mt-2">
				<li>Seamlessly upload GPX routes and track your journey.</li>
				<li>Integrate 3rd party apps to sync your activities in real time.</li>
				<li>Customize map themes with light, dark, and custom options.</li>
				<li>Track activity progress with an intuitive interface.</li>
			</ul>
			<h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Customization Options</h3>
			<p class="leading-7 [&:not(:first-child)]:mt-4">
				With TrackQuest, users have full control over how their experience is tailored. Whether it's
				changing the map theme or setting animation speeds, every aspect is adjustable to fit
				individual preferences.
			</p>
			<div class="my-6 w-full overflow-y-auto">
				<table class="w-full">
					<thead>
						<tr class="m-0 border-t p-0 even:bg-muted">
							<th class="border px-4 py-2 text-left font-bold">Feature</th>
							<th class="border px-4 py-2 text-left font-bold">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr class="m-0 border-t p-0 even:bg-muted">
							<td class="border px-4 py-2">Map Styles</td>
							<td class="border px-4 py-2"
								>Choose from light, dark, and satellite map views to customize the display for
								different conditions or preferences.</td
							>
						</tr>
						<tr class="m-0 border-t p-0 even:bg-muted">
							<td class="border px-4 py-2">Animation Speed</td>
							<td class="border px-4 py-2"
								>Set how fast activities are displayed on the map with adjustable animation
								intervals.</td
							>
						</tr>
						<tr class="m-0 border-t p-0 even:bg-muted">
							<td class="border px-4 py-2">Route Visualization</td>
							<td class="border px-4 py-2"
								>Modify stroke color and thickness to make your routes stand out more clearly.</td
							>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				Discover how TrackQuest can transform your activity tracking, offering both ease of use and
				powerful features for any athlete.
			</p>
		</div>
	</div>
</main>
