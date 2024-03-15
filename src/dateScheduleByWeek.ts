import { addDays } from './addDays'
import { range } from './utils'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by week.
 *
 * ```js
 * import { DateTz, dateScheduleByWeek, tzLocal } from '@jetblack/date-tz'
 *
 * console.log(
 *   dateScheduleByWeek(new DateTz(2000, 1, 1), 0, 4).map(x =>
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
