import { DateTz } from './DateTz'

/**
 * Find the quarter for a given date.
 *
 * ```js
 * import { quarterOfYear } from '@jetblack/date'
 *
 * console.log(quarterOfYear(new Date('2000-04-01')))
 * // 2
 * ```
 *
 * @category Calendars
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The quarter of the year.
 */
export function quarterOfYear(dateTz: DateTz): number {
  return Math.floor((dateTz.monthIndex + 3) / 3)
}
