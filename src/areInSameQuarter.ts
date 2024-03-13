import { DateTz } from './DateTz'
import { quarterOfYear } from './quarterOfYear'

/**
 * Compare two dates to see if they are in the same quarter of the year.
 *
 * ```js
 * import { areInSameQuarter } from '@jetblack/date'
 *
 * console.log(areInSameQuarter(new Date('2000-01-01'), new Date('2000-02-01')))
 * // true
 * console.log(areInSameQuarter(new Date('2000-01-01'), new Date('2000-04-01')))
 * // false
 * ```
 *
 * @category Comparisons
 *
 * @param first The first date.
 * @param second The second date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the dates are in the same quarter, otherwise false.
 */
export function areInSameQuarter(first: DateTz, second: DateTz): boolean {
  return quarterOfYear(first) === quarterOfYear(second)
}
