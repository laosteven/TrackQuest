 
import { writable } from 'svelte/store';

export const stravaTokenStore = writable<string | null>(null);
