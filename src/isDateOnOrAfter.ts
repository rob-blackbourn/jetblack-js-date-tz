import { DateTz } from './DateTz'

/**
 * Checks if the left date is on or after the right date.
 *
 * ```js
 * import { isDateOnOrAfter } from '@jetblack/date'
 *
 * console.log(isDateOnOrAfter(new Date('2000-01-02'), new Date('2000-01-01')))
 * // returns true
 * console.log(isDateOnOrAfter(new Date('2000-01-01'), new Date('2000-01-02')))
 * // returns false
 * console.log(isDateOnOrAfter(new Date('2000-01-01'), new Date('2000-01-01')))
 * // returns true
 * ```
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or after the right date, otherwise false.
 */
export function isDateOnOrAfter(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() >= rhs.getTime()
}
