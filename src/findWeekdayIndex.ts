import { DateTz } from './DateTz'

/**
 * Find the index of the first date with the given weekday.
 *
 * @param dates The dates
 * @param weekday The weekday to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findWeekdayIndex(dates: DateTz[], weekday: number): number {
  return dates.findIndex(date => date.weekday === weekday)
}
