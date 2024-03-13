import { addDays } from './addDays'
import { range } from './utils'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by day.
 *
 * ```js
 * import { dateScheduleByDay, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByDay(tzLocal.makeDate(2000, 0, 1), 0, 7).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (7) ['2000-01-01T00:00:00+??:??', '2000-01-02T00:00:00+??:??', '2000-01-03T00:00:00+??:??', '2000-01-04T00:00:00+??:??', '2000-01-05T00:00:00+??:??', '2000-01-06T00:00:00+??:??', '2000-01-07T00:00:00+??:??']
 * ```
 *
 * @category Ranges
 *
 * @param dateTz The start date.
 * @param start Start offset days.
 * @param stop The number of days.
 * @param step The days step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step days.
 */
export function dateScheduleByDay(
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  return range(start, stop, step).map(n => addDays(dateTz, n))
}
