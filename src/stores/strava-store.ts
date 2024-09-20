 
import {
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import type { DateRange } from 'bits-ui';
import { writable } from 'svelte/store';

export const stravaToken = writable<string | null>(null);
export const stravaInformationStore = writable({
  types: [] as string[],
  selectedTypes: [] as string[],
  fullDateRange: {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  } as DateRange,
  dateRange: {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  } as DateRange
})
