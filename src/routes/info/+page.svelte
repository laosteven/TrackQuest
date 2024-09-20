<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Activity from 'lucide-svelte/icons/activity';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Flame from 'lucide-svelte/icons/flame';
	import LandPlot from 'lucide-svelte/icons/land-plot';
	import Timer from 'lucide-svelte/icons/timer';

	let infoArrayPlaceholder = new Array(5);
	let globalStats = [
		{ title: 'Total Distance', description: 'Total running distance covered', value: '150 km' },
		{ title: 'Total Duration', description: 'Total time spent on activities', value: '20 hrs' },
		{ title: 'Total Activities', description: 'Number of activities logged', value: '45' },
		{ title: 'Total Calories', description: 'Total calories burned', value: '12000 kcal' },
		{ title: 'Average Pace', description: 'Average pace per kilometer', value: '5:30 min/km' },
		{ title: 'Elevation Gain', description: 'Total elevation gained', value: '800 m' }
	];

	function getRandomRunningDistance() {
		let min = 5;
		let max = 15;
		let randomDistance = Math.random() * (max - min) + min;
		return randomDistance.toFixed(2);
	}

	function getRandomDateString() {
		let start = new Date('2023-01-01').getTime();
		let end = new Date().getTime();
		let randomDate = new Date(start + Math.random() * (end - start));
		return randomDate.toLocaleDateString();
	}
</script>

<svelte:head>
	<title>TrackQuest | Info</title>
</svelte:head>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
	<div class="flex items-center">
		<h1 class="text-lg font-semibold md:text-2xl">Information</h1>
	</div>
	<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-0"
			data-x-chunk-description="A card showing the total distance in KM and the percentage difference from last month."
		>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Distance</Card.Title>
				<LandPlot class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">51 km</div>
				<p class="text-xs text-muted-foreground">+6% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-1"
			data-x-chunk-description="A card showing the total moving time and the percentage difference from last month."
		>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Moving time</Card.Title>
				<Timer class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">01:23:54</div>
				<p class="text-xs text-muted-foreground">+11% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-2"
			data-x-chunk-description="A card showing the total acitivity count and the percentage difference from last month."
		>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Activities</Card.Title>
				<Activity class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+5</div>
				<p class="text-xs text-muted-foreground">+1% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-3"
			data-x-chunk-description="A card showing the total calories spent and the percentage difference from last month."
		>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Calories spent</Card.Title>
				<Flame class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+2,324</div>
				<p class="text-xs text-muted-foreground">+324 since last month</p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
		<Card.Root
			class="xl:col-span-2"
			data-x-chunk-name="dashboard-01-chunk-4"
			data-x-chunk-description="A card showing a table of recent transactions with a link to view all transactions."
		>
			<Card.Header class="flex flex-row items-center">
				<div class="grid gap-2">
					<Card.Title>Activities</Card.Title>
					<Card.Description>Information about your recently tracked activties</Card.Description>
				</div>
				<Button href="##" size="sm" class="ml-auto gap-1">
					View All
					<ArrowUpRight class="h-4 w-4" />
				</Button>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head class="xl:table.-column hidden">Type</Table.Head>
							<Table.Head class="xl:table.-column hidden">Status</Table.Head>
							<Table.Head class="xl:table.-column hidden">Date</Table.Head>
							<Table.Head class="text-right">Distance</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each infoArrayPlaceholder as info, index}
							<Table.Row>
								<Table.Cell>
									<div class="font-medium">Example run {index + 1}</div>
									<div class="hidden text-sm text-muted-foreground md:inline">
										{getRandomDateString()}
									</div>
								</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">Run</Table.Cell>
								<Table.Cell class="xl:table.-column hidden">
									<Badge class="text-xs" variant="outline"></Badge>
								</Table.Cell>
								<Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden"></Table.Cell>
								<Table.Cell class="text-right font-medium"
									>{getRandomRunningDistance()} km</Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
		<Card.Root
			data-x-chunk-name="dashboard-01-chunk-5"
			data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
		>
			<Card.Header>
				<Card.Title>Global statistics</Card.Title>
			</Card.Header>
			<Card.Content class="mt-4 grid gap-8">
				{#each globalStats as stat}
					<div class="flex items-center gap-4">
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">{stat.title}</p>
							<p class="text-sm text-muted-foreground">{stat.description}</p>
						</div>
						<div class="ml-auto font-medium">{stat.value}</div>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</div>
