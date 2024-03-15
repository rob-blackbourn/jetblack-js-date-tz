import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last day of the year.
 *
 * ```js
 * import { DateTz, endOfYear, lastDayOfYear, tzUtc } from '@jetblack/date-tz'
 *
 * const days2 = lastDayOfYear(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days2.toISOString())
 * // 2022-12-31T00:00:00.000Z
 *
 * // Compare with endOfYear.
 * const days1 = endOfYear(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days1.toISOString())
 * // 2022-12-31T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A date which is the last day of the year.
 */
export function lastDayOfYear(dateTz: DateTz): DateTz {
  return new DateTz(dateTz.year, 12, 31, dateTz.tz)
}
