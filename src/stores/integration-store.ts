/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export const unfilteredCoordinatesStore = writable<any[]>();
export const filteredCoordinatesStore = writable<any[]>();

export const openStartDialog = writable(false)
export const openDateRangeDialog = writable(false)
export const openTypeFilteringDialog = writable(false)
