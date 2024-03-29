import { findLastIndex } from './utils'
import { DateTz } from './DateTz'

/**
 * Find the index of the last date with the given day of the month.
 *
 * @param dates The dates
 * @param day The day of the month to check
 * @returns The index of the last match, or -1.
 */
export function findLastDayIndex(dates: DateTz[], day: number): number {
  return findLastIndex(dates, date => date.day === day)
}
