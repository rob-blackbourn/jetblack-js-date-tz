import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Find the last day of the week for a given date.
 *
 * Note: weeks start on Sunday and end on Saturday.
 *
 * ```js
 * import { DateTz, lastDayOfWeek, tzUtc } from '@jetblack/date-tz'
 *
 * const days2 = lastDayOfWeek(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days2.toISOString())
 * // 2022-03-26T00:00:00.000Z
 *
 * // Compare to endOfWeek
 * const days1 = endOfWeek(new DateTz(2022, 3, 25, tzUtc))
 * console.log(days1.toISOString())
 * // 2022-03-26T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @returns A date which is the last day of the week.
 */
export function lastDayOfWeek(dateTz: DateTz): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = startOfDay(dateTz)
  return weekday === 6 ? dayEnd : addDays(dayEnd, 6 - weekday)
}
