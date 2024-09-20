
import { writable } from 'svelte/store';

export const settingsConfigurationStore = writable({
  theme: { value: 'light', label: 'Skyward Haven' },
  speedAnimation: 20,
  strokeWeight: 5,
  strokeColor: '#4ae5a1',
  strokeOpacity: 0.8,
  markerSize: 32,
}); 

export const openSettingsDrawer = writable(false);
export const onSaveSettingsAction = writable(false);
