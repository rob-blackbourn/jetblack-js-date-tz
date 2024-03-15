import { range } from './utils'
import { addQuarters } from './addQuarters'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by quarter.
 *
 * ```js
 * import { DateTz, dateScheduleByQuarter, tzLocal } from '@jetblack/date-tz'
 *
 * console.log(
 *   dateScheduleByQuarter(new DateTz(2000, 1, 1), 0, 4).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (4) ['2000-01-01T00:00:00+??:??', '2000-04-01T00:00:00+??:??', '2000-07-01T00:00:00+??:??', '2000-10-01T00:00:00+??:??']
 * ```
 *
 * @category Ranges
 *
 * @param dateTz The start date.
 * @param start Start offset quarters.
 * @param stop The number of quarters.
 * @param step The quarters step count.
 * @returns The schedule of dates separated by step quarter.
 */
export function dateScheduleByQuarter(
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  return range(start, stop, step).map(n => addQuarters(dateTz, n))
}
