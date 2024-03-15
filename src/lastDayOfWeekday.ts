import { addDays } from './addDays'
import { startOfDay } from './startOfDay'
import { DateTz } from './DateTz'

/**
 * Find the last day of the week for a given date and first day of week.
 *
 * ```js
 * import { DateTz, endOfWeekday, lastDayOfWeekday, tzUtc } from '@jetblack/date-tz'
 *
 * const days2 = lastDayOfWeekday(new DateTz(2022, 3, 25, tzUtc), 1)
 * console.log(days2.toISOString())
 * // 2022-03-27T00:00:00.000Z
 *
 * // Compare to endOfWeekday
 * const days1 = endOfWeekday(new DateTz(2022, 3, 25, tzUtc), 1)
 * console.log(days1.toISOString())
 * // 2022-03-27T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param weekStartsOn The first day of the week where 0 is Sunday.
 * @returns A date which is the last day of the week.
 */
export function lastDayOfWeekday(dateTz: DateTz, weekStartsOn: number): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = startOfDay(dateTz)
  const daysAway =
    (weekday < weekStartsOn ? -7 : 0) + 6 - (weekday - weekStartsOn)
  return daysAway === 0 ? dayEnd : addDays(dayEnd, daysAway)
}
