 
import { writable } from 'svelte/store';

export const stravaToken = writable<string | null>(null);
