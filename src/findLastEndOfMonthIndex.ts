import { findLastIndex } from './utils'
import { isLastDayOfMonth } from './isLastDayOfMonth'
import { DateTz } from './DateTz'

/**
 * Find the index of the last date that is the end of the month.
 *
 * @param dates The dates
 * @returns The index of the last match, or -1.
 */
export function findLastEndOfMonthIndex(dates: DateTz[]): number {
  return findLastIndex(dates, date => isLastDayOfMonth(date))
}
