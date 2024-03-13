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
 * import { tzLocal, isLastDayOfQuarter } from '@jetblack/date'
 *
 * const jan30 = tzLocal.makeDate(2008, 0, 30)
 * console.log(isLastDayOfQuarter(jan30, tzLocal))
 * // returns false
 *
 * const mar31 = tzLocal.makeDate(2008, 2, 31)
 * console.log(isLastDayOfQuarter(mar31, tzLocal))
 * // returns true
 * ```
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the date is the last day of the quarter.
 */
export function isLastDayOfQuarter(date: DateTz): boolean {
  const end = lastDayOfQuarter(date)
  return isDateEqual(startOfDay(date), end)
}
