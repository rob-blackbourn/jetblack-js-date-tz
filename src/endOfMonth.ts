import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'

/**
 * Calculate the last moment of the month.
 *
 * ```js
 * import { endOfMonth, tzUtc } from '@jetblack/date'
 *
 * const days1 = endOfMonth(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-31T23:59:59.999Z
 *
 * // Compare with lastDayOfMonth.
 * const days2 = lastDayOfMonth(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-31T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
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
