import { addDays } from './addDays'
import { startOfDay } from './startOfDay'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by day.
 *
 * ```js
 * import { dateRangeByDay, tzUtc, DateTz } from '@jetblack/date-tz'
 *
 * const dates = dateRangeByDay(
 *   new DateTz(2000, 1, 1, 12, 0, 0), // Sets to start of day.
 *   new DateTz(2000, 1, 10, 12, 0, 0),
 *   1,
 *   tzUtc
 * )
 * dates.forEach(date => console.log(date.toISOString()))
 * // 2000-01-01T00:00:00.000Z
 * // 2000-01-02T00:00:00.000Z
 * // 2000-01-03T00:00:00.000Z
 * // 2000-01-04T00:00:00.000Z
 * // 2000-01-05T00:00:00.000Z
 * // 2000-01-06T00:00:00.000Z
 * // 2000-01-07T00:00:00.000Z
 * // 2000-01-08T00:00:00.000Z
 * // 2000-01-09T00:00:00.000Z
 * // 2000-01-10T00:00:00.000Z
 * ```
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The day step count.
 * @returns The range of dates separated by step days from the start to the end date.
 */
export function dateRangeByDay(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfDay(endDate).getTime()
  let date = startOfDay(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addDays(date, step)
  }
  return dates
}
