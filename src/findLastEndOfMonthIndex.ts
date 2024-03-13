import { DateTz } from './DateTz'
import { isLastDayOfMonth } from './isLastDayOfMonth'
import { findLastIndex } from './utils'

/**
 * Find the index of the last date that is the end of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastEndOfMonthIndex(dates: DateTz[]): number {
  return findLastIndex(dates, date => isLastDayOfMonth(date))
}
