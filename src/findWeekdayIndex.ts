import { DateTz } from './DateTz'

/**
 * Find the index of the first date with the given weekday.
 *
 * @param dates The dates
 * @param weekday The weekday to check
 * @returns The index of the first match, or -1.
 */
export function findWeekdayIndex(dates: DateTz[], weekday: number): number {
  return dates.findIndex(date => date.weekday === weekday)
}
