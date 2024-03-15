import { findLastIndex } from './utils'
import { DateTz } from './DateTz'

/**
 * Find the index of the last date with the given weekday.
 *
 * @param dates The dates
 * @param weekday The weekday to check
 * @returns The index of the last match, or -1.
 */
export function findLastWeekdayIndex(dates: DateTz[], weekday: number): number {
  return findLastIndex(dates, date => date.weekday === weekday)
}
