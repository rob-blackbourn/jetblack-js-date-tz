import { DateTz } from './DateTz'
import { findLastIndex } from './utils'

/**
 * Find the index of the last date with the given day of the month.
 *
 * @param dates The dates
 * @param day The day of the month to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastDayIndex(dates: DateTz[], day: number): number {
  return findLastIndex(dates, date => date.day === day)
}
