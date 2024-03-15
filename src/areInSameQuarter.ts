import { quarterOfYear } from './quarterOfYear'
import { DateTz } from './DateTz'

/**
 * Compare two dates to see if they are in the same quarter of the year.
 *
 * ```js
 * import { areInSameQuarter, DateTz } from '@jetblack/date-tz'
 *
 * console.log(areInSameQuarter(new DateTz(2000, 1, 1), new DateTz(2000, 2, 1)))
 * // true
 * console.log(areInSameQuarter(new DateTz(2000, 1, 1), new DateTz(2000, 4, 1)))
 * // false
 * ```
 *
 * @category Comparisons
 *
 * @param first The first date.
 * @param second The second date.
 * @returns True if the dates are in the same quarter, otherwise false.
 */
export function areInSameQuarter(first: DateTz, second: DateTz): boolean {
  return quarterOfYear(first) === quarterOfYear(second)
}
