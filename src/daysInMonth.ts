import { isLeapYear } from './isLeapYear'

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Find the number of days in a month for a given year.
 *
 * ```js
 * import { daysInMonth } from '@jetblack/date-tz'
 *
 * console.log(daysInMonth(2000, 0))
 * // 31
 *
 * console.log(daysInMonth(2000, 1))
 * // 29
 *
 * console.log(daysInMonth(2001, 1))
 * // 28
 * ```
 *
 * @category Calendars
 *
 * @param year The year.
 * @param month The month where January is 1.
 * @returns The number of days in the month for the given year.
 */
export function daysInMonth(year: number, month: number): number {
  return isLeapYear(year) && month === 2 ? 29 : MONTH_DAYS[month - 1]
}
