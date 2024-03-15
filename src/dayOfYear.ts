import { diffInCalDays } from './diffInCalDays'
import { startOfYear } from './startOfYear'
import { DateTz } from './DateTz'

/**
 * Find the day of the year.
 *
 * ```js
 * import { DateTz, dayOfYear, tzUtc } from '@jetblack/date-tz'
 *
 * const d = new DateTz(2020, 7, 12)
 * const day = dayOfYear(d, tzUtc)
 * console.log(day)
 * // 94
 * ```
 *
 * @param dateTz The date
 * @returns The day of the year
 */
export function dayOfYear(dateTz: DateTz): number {
  const diff = diffInCalDays(dateTz, startOfYear(dateTz))
  const dayOfYear = diff + 1
  return dayOfYear
}
