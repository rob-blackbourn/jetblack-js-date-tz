import { DateTz } from './DateTz'

/**
 * Find the last moment of the year.
 *
 * ```js
 * import { DateTz, endOfYear, tzUtc } from '@jetblack/date-tz'
 *
 * const days1 = endOfYear(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days1.toISOString())
 * // 2022-12-31T23:59:59.999Z
 *
 * // Compare with lastDayOfYear.
 * const days2 = lastDayOfYear(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days2.toISOString())
 * // 2022-12-31T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date
 * @returns The last moment of the year.
 */
export function endOfYear(dateTz: DateTz): DateTz {
  return new DateTz(dateTz.year, 12, 31, 23, 59, 59, 999, dateTz.tz)
}
