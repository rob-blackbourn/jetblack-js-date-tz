import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'

/**
 * Find the last day of the month.
 *
 * ```js
 * import { DateTz, lastDayOfMonth, tzUtc } from '@jetblack/date-tz'
 *
 * const days2 = lastDayOfMonth(new DateTz(2022, 3, 25, tzLocal))
 * console.log(days2.toISOString())
 * // 2022-03-31T00:00:00.000Z
 *
 * // Compare with endOfMonth.
 * const days1 = endOfMonth(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days1.toISOString())
 * // 2022-03-31T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A date which is the last day of the month.
 */
export function lastDayOfMonth(dateTz: DateTz): DateTz {
  const { year, month } = dateTz.parts

  return new DateTz(year, month, daysInMonth(year, month), dateTz.tz)
}
