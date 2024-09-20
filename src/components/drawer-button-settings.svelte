<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Slider } from '$lib/components/ui/slider';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Bird from 'lucide-svelte/icons/bird';
	import Bone from 'lucide-svelte/icons/bone';
	import Rabbit from 'lucide-svelte/icons/rabbit';
	import Settings from 'lucide-svelte/icons/settings';
	import Undo from 'lucide-svelte/icons/undo';
	import { mode } from 'mode-watcher';
	import { settingsStore } from '../stores/settings-store';

	$: theme =
		$mode === 'light'
			? { value: 'light', label: 'Skyward Haven' }
			: { value: 'dark', label: 'Depths Abyss' };
	$: speedAnimation = 20;
	$: strokeWeight = 5;
	$: strokeOpacity = 0.8;
	$: markerSize = 32;

	settingsStore.subscribe((value) => {
		speedAnimation = value.speedAnimation;
		strokeWeight = value.strokeWeight;
		strokeOpacity = value.strokeOpacity;
		markerSize = value.markerSize;
	});

	function updateSettings() {
		settingsStore.update((currentSettings) => ({
			...currentSettings,
			theme,
			speedAnimation,
			strokeWeight,
			strokeOpacity,
			markerSize
		}));
	}
</script>

<Drawer.Root>
	<Drawer.Trigger class="ml-auto">
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					variant="ghost"
					size="icon"
					class="rounded-lg"
					aria-label="Settings"
					builders={[builder]}
				>
					<Settings class="size-5" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={5}>Settings</Tooltip.Content>
		</Tooltip.Root>
	</Drawer.Trigger>
	<Drawer.Content class="mx-auto sm:max-w-[400px]">
		<Drawer.Header>
			<Drawer.Title>Settings</Drawer.Title>
			<Drawer.Description>Customize your map experience</Drawer.Description>
		</Drawer.Header>
		<form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
			<fieldset class="grid gap-6 rounded-lg border p-4">
				<legend class="-ml-1 px-1 text-sm font-medium">Map</legend>
				<div class="grid gap-3">
					<Label for="model">Theme</Label>
					<Select.Root
						selected={theme}
						onSelectedChange={(selectedItem) => {
							theme = { value: selectedItem?.value ?? '', label: selectedItem?.label ?? '' };
						}}
					>
						<Select.Trigger id="model" class="items-start [&_[data-description]]:hidden">
							<Select.Value placeholder="Select a model" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="light" label="Skyward Haven">
								<div class="flex items-start gap-3 text-muted-foreground">
									<Bird class="size-5" />
									<div class="grid gap-0.5">
										<p>
											<span class="font-medium text-foreground">Skyward</span>
											Haven
										</p>
										<p class="text-xs" data-description>Airy design inspired by the skies above.</p>
									</div>
								</div>
							</Select.Item>
							<Select.Item value="dark" label="Depths Abyss">
								<div class="flex items-start gap-3 text-muted-foreground">
									<Bone class="size-5" />
									<div class="grid gap-0.5">
										<p>
											<span class="font-medium text-foreground"> Depths </span>
											Abyss
										</p>
										<p class="text-xs" data-description>Plunge into the shadows.</p>
									</div>
								</div>
							</Select.Item>
							<Select.Item value="hero" label="Hero's Path">
								<div class="flex items-start gap-3 text-muted-foreground">
									<Rabbit class="size-5" />
									<div class="grid gap-0.5">
										<p>
											<span class="font-medium text-foreground"> Hero's </span>
											Path
										</p>
										<p class="text-xs" data-description>A grounded and natural aesthetic.</p>
									</div>
								</div>
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="grid gap-3">
					<Label for="speed">Animation speed</Label>
					<Slider
						value={[speedAnimation]}
						min={5}
						max={50}
						step={1}
						onValueChange={(value) => (speedAnimation = value[0])}
					/>
					<div class="flex items-center gap-4">
						<p class="text-sm text-muted-foreground">Value: {speedAnimation}ms</p>
						<Button
							class="ml-auto h-8"
							variant="outline"
							size="icon"
							on:click={() => (speedAnimation = 20)}><Undo class="h-4 w-4" /></Button
						>
					</div>
				</div>
				<div class="grid gap-3">
					<Label for="top-p">Stroke width</Label>
					<Slider
						value={[strokeWeight]}
						min={0}
						max={20}
						step={1}
						onValueChange={(value) => (strokeWeight = value[0])}
					/>
					<div class="flex items-center gap-4">
						<p class="text-sm text-muted-foreground">Value: {strokeWeight}px</p>
						<Button
							class="ml-auto h-8"
							variant="outline"
							size="icon"
							on:click={() => (strokeWeight = 5)}><Undo class="h-4 w-4" /></Button
						>
					</div>
				</div>
				<div class="grid gap-3">
					<Label for="top-k">Stroke opacity</Label>
					<Slider
						value={[strokeOpacity]}
						min={0.0}
						max={1.0}
						step={0.01}
						onValueChange={(value) => (strokeOpacity = value[0])}
					/>
					<div class="flex items-center gap-4">
						<p class="text-sm text-muted-foreground">Value: {(strokeOpacity * 100).toFixed(0)}%</p>
						<Button
							class="ml-auto h-8"
							variant="outline"
							size="icon"
							on:click={() => (strokeOpacity = 0.8)}><Undo class="h-4 w-4" /></Button
						>
					</div>
				</div>
				<div class="grid gap-3">
					<Label for="top-k">Marker size</Label>
					<Slider
						value={[markerSize]}
						min={0}
						max={64}
						step={4}
						onValueChange={(value) => (markerSize = value[0])}
					/>
					<div class="flex items-center gap-4">
						<p class="text-sm text-muted-foreground">Value: {markerSize}px</p>
						<Button
							class="ml-auto h-8"
							variant="outline"
							size="icon"
							on:click={() => (markerSize = 32)}><Undo class="h-4 w-4" /></Button
						>
					</div>
				</div>
			</fieldset>
		</form>
		<Drawer.Footer>
			<Drawer.Close>
				<Button class="w-full" on:click={updateSettings}>Save</Button>
			</Drawer.Close>
			<Drawer.Close>
				<Button variant="outline" class="w-full">Cancel</Button>
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
