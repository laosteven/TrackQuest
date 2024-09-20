/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocalTimeZone, today } from '@internationalized/date';
import type { DateRange } from 'bits-ui';
import { writable } from 'svelte/store';

export const activitiesStore = writable<any[]>();
export const filteredActivitiesStore = writable<any[]>();

export const unfilteredCoordinatesStore = writable<any[]>();
export const filteredCoordinatesStore = writable<any[]>();

export const openStartDialog = writable(false)

export const openDateRangeDialog = writable(false)
export const dateRangeStore = writable({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone())
} as DateRange)
export const onSaveDateRangeAction = writable(false)

export const openActivityTypeDialog = writable(false)
export const activityTypeStore = writable<string[]>([])
export const selectedActivityTypeStore = writable<string[]>([])
export const onSaveActivityTypeDialog = writable(false)

export const onActivityFilteringDone = writable(false)
