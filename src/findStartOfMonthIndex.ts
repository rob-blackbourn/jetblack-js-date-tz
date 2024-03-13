import { DateTz } from './DateTz'
import { findDayIndex } from './findDayIndex'

/**
 * Find the index of the first date that is the start of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findStartOfMonthIndex(dates: DateTz[]): number {
  return findDayIndex(dates, 1)
}
