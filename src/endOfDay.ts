import { DateTz } from './DateTz'

/**
 * Return the end of the day for the given date.
 *
 * ```js
 * import { DateTz, endOfDay, tzUtc } from '@jetblack/date-tz'
 *
 * const d1 = new DateTz(2000, 1, 1, tzUtc)
 * const d2 = endOfDay(d1)
 * console.log(d2.toISOString())
 * // 2000-02-01T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(dateTz: DateTz): DateTz {
  const { year, month, day } = dateTz.parts
  return new DateTz(year, month, day, 23, 59, 59, 999, dateTz.tz)
}
