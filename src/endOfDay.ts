import { DateTz } from './DateTz'

/**
 * Return the end of the day for the given date.
 *
 * ```js
 * import { endOfDay, tzUtc } from '@jetblack/date'
 *
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfDay(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-01T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(dateTz: DateTz): DateTz {
  const { year, monthIndex, day } = dateTz.parts
  return new DateTz(year, monthIndex, day, 23, 59, 59, 999, dateTz.tz)
}
