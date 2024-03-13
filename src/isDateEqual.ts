import { DateTz } from './DateTz'

/**
 * Checks if the dates are equal.
 *
 * @category Comparisons
 *
 * ```js
 * import { isDateEqual } '@jetblack/date'
 *
 * console.log(isDateEqual(new Date('2000-01-02'), new Date('2000-01-01')))
 * // returns false
 * console.log(isDateEqual(new Date('2000-01-01'), new Date('2000-01-02')))
 * // returns false
 * console.log(isDateEqual(new Date('2000-01-01'), new Date('2000-01-01')))
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
