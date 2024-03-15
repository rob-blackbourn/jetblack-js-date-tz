import { DateTz } from './DateTz'
import { isDateEqual } from './isDateEqual'
import { lastDayOfQuarter } from './lastDayOfQuarter'
import { startOfDay } from './startOfDay'

/**
 * Check if the date is the last day of the quarter.
 *
 * Any time component is ignored.
 *
 * ```js
 * import { DateTz, tzLocal, isLastDayOfQuarter } from '@jetblack/date-tz'
 *
 * const jan30 = new DateTz(2008, 1, 30, tzLocal)
 * console.log(isLastDayOfQuarter(jan30))
 * // returns false
 *
 * const mar31 = new DateTz(2008, 3, 31, tzLocal)
 * console.log(isLastDayOfQuarter(mar31))
 * // returns true
 * ```
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @returns True if the date is the last day of the quarter.
 */
export function isLastDayOfQuarter(date: DateTz): boolean {
  const end = lastDayOfQuarter(date)
  return isDateEqual(startOfDay(date), end)
}
