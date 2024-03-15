import { isLeapYear } from './isLeapYear'

/**
 * Find the number of days in a year.
 *
 * ```js
 * import { daysInYear } from '@jetblack/date-tz'
 *
 * console.log(daysInYear(2000))
 * // 366
 *
 * console.log(daysInYear(2001))
 * // 365
 * ```
 *
 * @category Calendars
 *
 * @param year The year.
 * @returns The number of days in the year.
 */
export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365
}
