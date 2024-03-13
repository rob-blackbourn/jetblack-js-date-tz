import { DateTz } from './DateTz'
import { findLastDayIndex } from './findLastDayIndex'

/**
 * Find the index of the last date that is the start of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastStartOfMonthIndex(dates: DateTz[]): number {
  return findLastDayIndex(dates, 1)
}
