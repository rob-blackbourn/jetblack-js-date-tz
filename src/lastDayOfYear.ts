import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last day of the year.
 *
 * ```js
 * import { endOfYear, lastDayOfYear, tzUtc } from '@jetblack/date'
 *
 * const days2 = lastDayOfYear(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-12-31T00:00:00.000Z
 *
 * // Compare with endOfYear.
 * const days1 = endOfYear(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-12-31T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the year.
 */
export function lastDayOfYear(dateTz: DateTz): DateTz {
  return new DateTz(dateTz.year, 11, 31, dateTz.tz)
}
