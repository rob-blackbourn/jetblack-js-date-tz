import { range } from './utils'
import { addYears } from './addYears'
import { DateTz } from './DateTz'

/**
 * Creates a schedule of dates by year.
 *
 * ```js
 * import { dateScheduleByYear, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByYear(tzLocal.makeDate(2000, 0, 1), 0, 4).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (4) ['2000-01-01T00:00:00+??:??', '2001-01-01T00:00:00+??:??', '2002-01-01T00:00:00+??:??', '2003-01-01T00:00:00+??:??']
 * ```
 *
 * @category Ranges
 *
 * @param dateTz The start date.
 * @param start Start offset years.
 * @param stop The number of years.
 * @param step The years step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step years.
 */
export function dateScheduleByYear(
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  return range(start, stop, step).map(n => addYears(dateTz, n))
}
