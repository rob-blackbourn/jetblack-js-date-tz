import { startOfYear } from './startOfYear'
import { MILLISECONDS_IN_DAY } from './constants'
import { DateTz } from './DateTz'

/**
 * Find the week of the year for a given date.
 *
 * Weeks start on 1 January of any given year.
 *
 * ```js
 * import { weekOfYear, tzUtc } from '@jetblack/date'
 *
 * console.log(weekOfYear(new Date('1999-12-31T00:00:00Z'), tzUtc))
 * // 53
 * console.log(weekOfYear(new Date('2000-01-01T00:00:00Z'), tzUtc))
 * // 1
 * console.log(weekOfYear(new Date('2000-01-07T00:00:00Z'), tzUtc))
 * // 1
 * console.log(weekOfYear(new Date('2000-01-08T00:00:00Z'), tzUtc))
 * // 2
 * console.log(weekOfYear(new Date('2000-12-31T00:00:00Z'), tzUtc))
 * // 53
 * ```
 *
 * @category Miscellaneous
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week of the year.
 */
export function weekOfYear(dateTz: DateTz): number {
  const jan1 = startOfYear(dateTz)
  const daysBetween = (dateTz.getTime() - jan1.getTime()) / MILLISECONDS_IN_DAY
  return 1 + Math.trunc(daysBetween / 7)
}
