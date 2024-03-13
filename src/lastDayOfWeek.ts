import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Find the last day of the week for a given date.
 *
 * Note: weeks start on Sunday and end on Saturday.
 *
 * ```js
 * import { lastDayOfWeek, tzUtc } from '@jetblack/date'
 *
 * const days2 = lastDayOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-26T00:00:00.000Z
 *
 * // Compare to endOfWeek
 * const days1 = endOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-26T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the week.
 */
export function lastDayOfWeek(dateTz: DateTz): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = startOfDay(dateTz)
  return weekday === 6 ? dayEnd : addDays(dayEnd, 6 - weekday)
}
