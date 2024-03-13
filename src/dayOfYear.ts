import { startOfYear } from './startOfYear'
import { diffInCalDays } from './diffInCalDays'
import { DateTz } from './DateTz'

/**
 * Find the day of the year.
 *
 * ```js
 * import { dayOfYear, tzUtc } from '@jetblack/date'
 *
 * const d = new Date('2020-07-12T00:00:00Z')
 * const day = dayOfYear(d, tzUtc)
 * console.log(day)
 * // 94
 * ```
 *
 * @param dateTz The date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The day of the year
 */
export function dayOfYear(dateTz: DateTz): number {
  const diff = diffInCalDays(dateTz, startOfYear(dateTz))
  const dayOfYear = diff + 1
  return dayOfYear
}
