import { DateTz } from './DateTz'

/**
 * Checks if the left date is on or before the right date.
 *
 * ```js
 * import { isDateOnOrBefore } from '@jetblack/date'
 *
 * console.log(isDateOnOrBefore(new Date('2000-01-02'), new Date('2000-01-01')))
 * // returns false
 * console.log(isDateOnOrBefore(new Date('2000-01-01'), new Date('2000-01-02')))
 * // returns true
 * console.log(isDateOnOrBefore(new Date('2000-01-01'), new Date('2000-01-01')))
 * // returns true
 * ```
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or before the right date, otherwise false.
 */
export function isDateOnOrBefore(lhs: DateTz, rhs: DateTz): boolean {
  return lhs.getTime() <= rhs.getTime()
}
