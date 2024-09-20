/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export const coordinatesStore = writable<any[]>();
export const filteredCoordinatesStore = writable<any[]>();
