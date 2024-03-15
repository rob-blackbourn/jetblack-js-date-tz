/**
 * Check if the year is a leap year.
 *
 * ```js
 * import { isLeapYear } from '@jetblack/date-tz'
 *
 * // 2000 was a century leap year.
 * console.log(isLeapYear(2000) === true)
 *
 * // 1900 was not.
 * console.log(isLeapYear(1900) !== true)
 * ```
 *
 * @category Calendars
 *
 * @param year The year.
 * @returns True if the year is a leap year, otherwise false.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
