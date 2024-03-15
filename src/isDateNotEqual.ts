import { DateTz } from './DateTz'

/**
 * Checks if the dates are not equal.
 *
 * ```js
 * import { DateTz, isDateNotEqual } from '@jetblack/date-tz'
 *
 * console.log(isDateNotEqual(new DateTz('2000-01-02'), new DateTz('2000-01-01')))
 * // returns true
 * console.log(isDateNotEqual(new DateTz('2000-01-01'), new DateTz('2000-01-02')))
 * // returns true
 * console.log(isDateNotEqual(new DateTz('2000-01-01'), new DateTz('2000-01-01')))
 * // returns false
 * ```
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the dates are not equal, otherwise false.
 */
export function isDateNotEqual(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() !== rhs.getTime()
}
