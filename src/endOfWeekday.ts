import { addDays } from './addDays'
import { endOfDay } from './endOfDay'
import { DateTz } from './DateTz'

/**
 * Find the last moment of the week for a given date and first day of week.
 *
 * ```js
 * import { endOfWeekday, tzUtc } from '@jetblack/date'
 *
 * const days1 = endOfWeekday(new Date('2022-03-25T00:00:00Z'), 1, tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-27T23:59:59.999Z
 *
 * // Compare to lastDayOfWeekday
 * const days2 = lastDayOfWeekday(new Date('2022-03-25T00:00:00Z'), 1, tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-27T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param weekStartsOn The first day of the week where 0 is Sunday.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The end of the week.
 */
export function endOfWeekday(dateTz: DateTz, weekStartsOn: number): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = endOfDay(dateTz)
  const daysAway =
    (weekday < weekStartsOn ? -7 : 0) + 6 - (weekday - weekStartsOn)
  return daysAway === 0 ? dayEnd : addDays(dayEnd, daysAway)
}
