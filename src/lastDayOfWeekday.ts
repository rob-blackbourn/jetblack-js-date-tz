import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Find the last day of the week for a given date and first day of week.
 *
 * ```js
 * import { endOfWeekday, lastDayOfWeekday, tzUtc } from '@jetblack/date'
 *
 * const days2 = lastDayOfWeekday(new Date('2022-03-25T00:00:00Z'), 1, tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-27T00:00:00.000Z
 *
 * // Compare to endOfWeekday
 * const days1 = endOfWeekday(new Date('2022-03-25T00:00:00Z'), 1, tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-27T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param weekStartsOn The first day of the week where 0 is Sunday.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the week.
 */
export function lastDayOfWeekday(dateTz: DateTz, weekStartsOn: number): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = startOfDay(dateTz)
  const daysAway =
    (weekday < weekStartsOn ? -7 : 0) + 6 - (weekday - weekStartsOn)
  return daysAway === 0 ? dayEnd : addDays(dayEnd, daysAway)
}
