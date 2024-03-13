import { addDays } from './addDays'
import { range } from './utils'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by week.
 *
 * ```js
 * import { dateScheduleByWeek, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByWeek(tzLocal.makeDate(2000, 0, 1), 0, 4).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (4) ['2000-01-01T00:00:00+??:??', '2000-01-08T00:00:00+??:??', '2000-01-15T00:00:00+??:??', '2000-01-22T00:00:00+??:??']
 * ```
 *
 * @category Ranges
 *
 * @param dateTz The start date.
 * @param start Start offset weeks.
 * @param stop The number of weeks.
 * @param step The weeks step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step weeks.
 */
export function dateScheduleByWeek(
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  return range(start, stop, step).map(n => addDays(dateTz, n * 7))
}
