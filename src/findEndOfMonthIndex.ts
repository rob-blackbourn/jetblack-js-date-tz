import { DateTz } from './DateTz'
import { isLastDayOfMonth } from './isLastDayOfMonth'

/**
 * Find the index of the first date that is the end of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findEndOfMonthIndex(dates: DateTz[]): number {
  return dates.findIndex(date => isLastDayOfMonth(date))
}
