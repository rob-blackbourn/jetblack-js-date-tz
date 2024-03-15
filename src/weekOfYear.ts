import { startOfYear } from './startOfYear'
import { MILLISECONDS_IN_DAY } from './constants'
import { DateTz } from './DateTz'

/**
 * Find the week of the year for a given date.
 *
 * Weeks start on 1 January of any given year.
 *
 * ```js
 * import { DateTz, weekOfYear, tzUtc } from '@jetblack/date-tz'
 *
 * console.log(weekOfYear(new DateTz(1999, 12, 31, tzUtc)))
 * // 53
 * console.log(weekOfYear(new DateTz(2000, 1, 1, tzUtc)))
 * // 1
 * console.log(weekOfYear(new DateTz(2000, 1, 7, tzUtc)))
 * // 1
 * console.log(weekOfYear(new DateTz(2000, 1, 8, tzUtc)))
 * // 2
 * console.log(weekOfYear(new DateTz(2000, 12, 31, tzUtc)))
 * // 53
 * ```
 *
 * @category Miscellaneous
 *
 * @param dateTz The date.
 * @returns The week of the year.
 */
export function weekOfYear(dateTz: DateTz): number {
  const jan1 = startOfYear(dateTz)
  const daysBetween = (dateTz.getTime() - jan1.getTime()) / MILLISECONDS_IN_DAY
  return 1 + Math.trunc(daysBetween / 7)
}
