<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Slider } from '$lib/components/ui/slider';
	import Bird from 'lucide-svelte/icons/bird';
	import Bone from 'lucide-svelte/icons/bone';
	import Rabbit from 'lucide-svelte/icons/rabbit';
	import Undo from 'lucide-svelte/icons/undo';
	import { onSaveSettingsAction, settingsConfigurationStore } from '../../stores/settings-store';

	const { markerSize, speedAnimation, strokeColor, strokeOpacity, strokeWeight, theme } =
		$settingsConfigurationStore;

	$: currentTheme = theme;
	$: currentSpeedAnimation = speedAnimation;
	$: currentStrokeWeight = strokeWeight;
	$: currentStrokeOpacity = strokeOpacity;
	$: currentStrokeColor = strokeColor;
	$: currentMarkerSize = markerSize;

	onSaveSettingsAction.subscribe((isSaving) => {
		if (isSaving) {
			settingsConfigurationStore.update((currentSettings) => ({
				...currentSettings,
				theme: currentTheme,
				speedAnimation: currentSpeedAnimation,
				strokeWeight: currentStrokeWeight,
				strokeOpacity: currentStrokeOpacity,
				strokeColor: currentStrokeColor,
				markerSize: currentMarkerSize
			}));
			onSaveSettingsAction.set(false);
		}
	});
</script>

<form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
	<fieldset class="grid gap-6 rounded-lg border p-4">
		<legend class="-ml-1 px-1 text-sm font-medium">Map</legend>
		<div class="grid gap-3">
			<Label for="model">Theme</Label>
			<Select.Root
				selected={currentTheme}
				onSelectedChange={(selectedItem) => {
					currentTheme = { value: selectedItem?.value ?? '', label: selectedItem?.label ?? '' };
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
			<Label for="animation-speed">Animation speed</Label>
			<Slider
				value={[currentSpeedAnimation]}
				min={5}
				max={50}
				step={1}
				onValueChange={(value) => (currentSpeedAnimation = value[0])}
			/>
			<div class="flex items-center gap-4">
				<p class="text-sm text-muted-foreground">Value: {currentSpeedAnimation}ms</p>
				<Button
					class="ml-auto h-8"
					variant="outline"
					size="icon"
					on:click={() => (currentSpeedAnimation = 20)}><Undo class="h-4 w-4" /></Button
				>
			</div>
		</div>
		<div class="grid gap-3">
			<Label for="stroke-width">Stroke width</Label>
			<Slider
				value={[currentStrokeWeight]}
				min={0}
				max={20}
				step={1}
				onValueChange={(value) => (currentStrokeWeight = value[0])}
			/>
			<div class="flex items-center gap-4">
				<p class="text-sm text-muted-foreground">Value: {currentStrokeWeight}px</p>
				<Button
					class="ml-auto h-8"
					variant="outline"
					size="icon"
					on:click={() => (currentStrokeWeight = 5)}><Undo class="h-4 w-4" /></Button
				>
			</div>
		</div>
		<div class="grid gap-3">
			<Label for="stroke-opacity">Stroke opacity</Label>
			<Slider
				value={[currentStrokeOpacity]}
				min={0.0}
				max={1.0}
				step={0.01}
				onValueChange={(value) => (currentStrokeOpacity = value[0])}
			/>
			<div class="flex items-center gap-4">
				<p class="text-sm text-muted-foreground">
					Value: {(currentStrokeOpacity * 100).toFixed(0)}%
				</p>
				<Button
					class="ml-auto h-8"
					variant="outline"
					size="icon"
					on:click={() => (currentStrokeOpacity = 0.8)}><Undo class="h-4 w-4" /></Button
				>
			</div>
		</div>
		<div class="grid gap-3">
			<Label for="stroke-color">Stroke color</Label>
			<Input id="stroke-color" type="color" bind:value={currentStrokeColor} />
			<div class="flex items-center gap-4">
				<Button
					class="ml-auto h-8"
					variant="outline"
					size="icon"
					on:click={() => (currentStrokeColor = '#4ae5a1')}><Undo class="h-4 w-4" /></Button
				>
			</div>
		</div>
		<div class="grid gap-3">
			<Label for="marker-size">Marker size</Label>
			<Slider
				value={[currentMarkerSize]}
				min={0}
				max={64}
				step={4}
				onValueChange={(value) => (currentMarkerSize = value[0])}
			/>
			<div class="flex items-center gap-4">
				<p class="text-sm text-muted-foreground">Value: {currentMarkerSize}px</p>
				<Button
					class="ml-auto h-8"
					variant="outline"
					size="icon"
					on:click={() => (currentMarkerSize = 32)}><Undo class="h-4 w-4" /></Button
				>
			</div>
		</div>
	</fieldset>
</form>
