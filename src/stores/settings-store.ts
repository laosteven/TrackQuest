
import { writable } from 'svelte/store';

export const settingsStore = writable({
  theme: { value: 'light', label: 'Skyward Haven' },
  speedAnimation: 20,
  strokeWeight: 5,
  strokeColor: '#4ae5a1',
  strokeOpacity: 0.8,
  markerSize: 32,
}); 
