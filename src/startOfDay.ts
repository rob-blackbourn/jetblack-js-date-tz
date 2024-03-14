import { DateTz } from './DateTz'

/**
 * Find the start of the day.
 *
 * ```js
 * import { startOfDay, tzLocal } from '@jetblack/date'
 *
 * const date = tzLocal.makeDate(2000, 0, 1, 10, 30)
 * console.log(tzLocal.toISOString(startOfDay(date, tzLocal)))
 * // returns "2000-01-01T00:00:00+??:??"
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day.
 */
export function startOfDay(dateTz: DateTz): DateTz {
  const { year, month, day } = dateTz.tz.dateParts(dateTz.date)

  return new DateTz(year, month, day, dateTz.tz)
}
