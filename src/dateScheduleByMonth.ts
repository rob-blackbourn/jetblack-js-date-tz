import { range } from './utils'
import { addMonths } from './addMonths'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by month.
 *
 * ```js
 * import { dateScheduleByMonth, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByMonth(tzLocal.makeDate(2000, 0, 1), 0, 6).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (6) ['2000-01-01T00:00:00+??:??', '2000-02-01T00:00:00+??:??', '2000-03-01T00:00:00+??:??', '2000-04-01T00:00:00+??:??', '2000-05-01T00:00:00+??:??', '2000-06-01T00:00:00+??:??']
 * ```
 *
 * @category Ranges
 *
 * @param dateTz The start date.
 * @param start Start offset months.
 * @param stop The number of months.
 * @param step The months step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step months.
 */
export function dateScheduleByMonth(
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  return range(start, stop, step).map(n => addMonths(dateTz, n))
}
