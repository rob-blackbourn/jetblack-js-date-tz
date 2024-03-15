import { DateTz } from './DateTz'

/**
 * Find the quarter for a given date.
 *
 * ```js
 * import { DateTz, quarterOfYear } from '@jetblack/date-tz'
 *
 * console.log(quarterOfYear(new DateTz(2000, 4, 1)))
 * // 2
 * ```
 *
 * @category Calendars
 *
 * @param dateTz The date.
 * @returns The quarter of the year.
 */
export function quarterOfYear(dateTz: DateTz): number {
  return Math.floor((dateTz.month + 2) / 3)
}
