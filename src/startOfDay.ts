import { DateTz } from './DateTz'

/**
 * Find the start of the day.
 *
 * ```js
 * import { DateTz, startOfDay, tzLocal } from '@jetblack/date-tz'
 *
 * const date = new DateTz(2000, 0, 1, 10, 30, tzLocal)
 * console.log(startOfDay(date).toISOString)
 * // returns "2000-01-01T00:00:00+??:??"
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the day.
 */
export function startOfDay(dateTz: DateTz): DateTz {
  const { year, month, day } = dateTz.tz.dateParts(dateTz.date)

  return new DateTz(year, month, day, dateTz.tz)
}
