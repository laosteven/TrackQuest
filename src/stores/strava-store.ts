/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export const stravaToken = writable<string | null>(null);
export const stravaActivities = writable<string | any[]>( []);
