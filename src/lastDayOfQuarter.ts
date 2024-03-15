import { daysInMonth } from './daysInMonth'
import { quarterOfYear } from './quarterOfYear'
import { DateTz } from './DateTz'

/**
 * Find the last day of the quarter.
 *
 * ```js
 * import { DateTz, lastDayOfQuarter, tzLocal } from '@jetblack/date-tz'
 *
 * console.log(
  lastDayOfQuarter(new DateTz(2000, 1, 2, tzLocal)).toISOString()
 * )
 * // returns 2000-03-31T00:00:00-??:??
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @returns A date which is the last day of the quarter.
 */
export function lastDayOfQuarter(date: DateTz): DateTz {
  const quarter = quarterOfYear(date)
  const month = 3 * (quarter - 1) + 3
  const year = date.year
  const day = daysInMonth(year, month)
  return new DateTz(year, month, day, date.tz)
}
