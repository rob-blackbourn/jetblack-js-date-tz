import { range } from './utils'
import { addQuarters } from './addQuarters'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by quarter.
 *
 * ```js
 * import { dateScheduleByQuarter, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByQuarter(tzLocal.makeDate(2000, 0, 1), 0, 4).map(x =>
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
 * @param tz An optional timezone. Defaults to the local timezone.
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
