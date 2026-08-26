import { getPrayerTimes as apiGetPrayerTimes } from '@/lib/api/prayerTimes';
import type { PrayerTimesResponse, PrayerTimesParams } from '@/lib/api/prayerTimes';

/**
 * Calculate prayer times for a given city and date.
 * Delegates to the lib/api/prayerTimes.ts wrapper which calls the Aladhan API.
 */
export async function getPrayerTimes(params: PrayerTimesParams): Promise<PrayerTimesResponse> {
  return apiGetPrayerTimes(params);
}

export type { PrayerTimesResponse, PrayerTimesParams };