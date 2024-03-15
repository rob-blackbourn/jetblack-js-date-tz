import { DateTz } from './DateTz'

/**
 * Checks if the dates are equal.
 *
 * @category Comparisons
 *
 * ```js
 * import { DateTz, isDateEqual } '@jetblack/date-tz'
 *
 * console.log(isDateEqual(new DateTz('2000-01-02'), new DateTz('2000-01-01')))
 * // returns false
 * console.log(isDateEqual(new DateTz('2000-01-01'), new DateTz('2000-01-02')))
 * // returns false
 * console.log(isDateEqual(new DateTz('2000-01-01'), new DateTz('2000-01-01')))
 * // returns true
 * ```
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date equals the right date, otherwise false.
 */
export function isDateEqual(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() === rhs.getTime()
}
