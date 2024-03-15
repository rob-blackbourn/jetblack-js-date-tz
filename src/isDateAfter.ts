import { DateTz } from './DateTz'

/**
 * Checks if the left date is after the right date.
 *
 * ```js
 * import { DateTz, isDateAfter } from '@jetblack/date-tz'
 *
 * console.log(isDateAfter(new DateTz('2000-01-02'), new DateTz('2000-01-01')))
 * // returns true
 * console.log(isDateAfter(new DateTz('2000-01-01'), new DateTz('2000-01-02')))
 * // returns false
 * console.log(isDateAfter(new DateTz('2000-01-01'), new DateTz('2000-01-01')))
 * // returns false
 * ```
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is after the right date, otherwise false.
 */
export function isDateAfter(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() > rhs.getTime()
}
