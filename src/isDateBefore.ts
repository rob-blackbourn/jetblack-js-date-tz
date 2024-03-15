import { DateTz } from './DateTz'

/**
 * Checks if the left date is before the right date.
 *
 * @category Comparisons
 *
 * ```js
 * import { DateTz, isDateBefore } from '@jetblack/date-tz'
 *
 * console.log(isDateBefore(new DateTz('2000-01-02'), new DateTz('2000-01-01')))
 * // returns false
 * console.log(isDateBefore(new DateTz('2000-01-01'), new DateTz('2000-01-02')))
 * // returns true
 * console.log(isDateBefore(new DateTz('2000-01-01'), new DateTz('2000-01-01')))
 * // returns false
 * ```
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is before the right date, otherwise false.
 */
export function isDateBefore(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() < rhs.getTime()
}
