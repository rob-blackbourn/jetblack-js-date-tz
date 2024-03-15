import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'

/**
 * Calculate the last moment of the month.
 *
 * ```js
 * import { DateTz, endOfMonth, tzUtc } from '@jetblack/date-tz'
 *
 * const days1 = endOfMonth(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days1.toISOString())
 * // 2022-03-31T23:59:59.999Z
 *
 * // Compare with lastDayOfMonth.
 * const days2 = lastDayOfMonth(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days2.toISOString())
 * // 2022-03-31T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A date which is the last day of the month for the given year and month.
 */
export function endOfMonth(dateTz: DateTz): DateTz {
  const { year, month } = dateTz.parts

  return new DateTz(
    year,
    month,
    daysInMonth(year, month),
    23,
    59,
    59,
    999,
    dateTz.tz
  )
}
