import { isLastDayOfMonth } from './isLastDayOfMonth'
import { DateTz } from './DateTz'

/**
 * Find the index of the first date that is the end of the month.
 *
 * @param dates The dates
 * @returns The index of the first match, or -1.
 */
export function findEndOfMonthIndex(dates: DateTz[]): number {
  return dates.findIndex(date => isLastDayOfMonth(date))
}
