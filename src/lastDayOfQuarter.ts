import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the last day of the quarter.
 *
 * ```js
 * import { lastDayOfQuarter, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   tzLocal.toISOString(lastDayOfQuarter(tzLocal.makeDate(2000, 1, 2), tzLocal))
 * )
 * // returns 2000-03-31T00:00:00-??:??
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the quarter.
 */
export function lastDayOfQuarter(date: DateTz): DateTz {
  const quarter = quarterOfYear(date)
  const monthIndex = 3 * (quarter - 1) + 2
  const year = date.year
  const day = daysInMonth(year, monthIndex)
  return new DateTz(year, monthIndex, day, date.tz)
}
