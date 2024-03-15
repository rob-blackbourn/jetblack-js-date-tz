import { findDayIndex } from './findDayIndex'
import { DateTz } from './DateTz'

/**
 * Find the index of the first date that is the start of the month.
 *
 * @param dates The dates
 * @returns The index of the first match, or -1.
 */
export function findStartOfMonthIndex(dates: DateTz[]): number {
  return findDayIndex(dates, 1)
}
