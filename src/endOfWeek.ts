import { addDays } from './addDays'
import { endOfDay } from './endOfDay'
import { DateTz } from './DateTz'

/**
 * Find the last moment of the week for a given date.
 *
 * Weeks start on Sunday and end on Saturday.
 *
 * ```js
 * import { endOfWeek, tzUtc } from '@jetblack/date'
 *
 * const days1 = endOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-26T23:59:59.999Z
 *
 * // Compare to lastDayOfWeek
 * const days2 = lastDayOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-26T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The end of the week.
 */
export function endOfWeek(dateTz: DateTz): DateTz {
  const weekday = dateTz.weekday
  const dayEnd = endOfDay(dateTz)
  return weekday === 6 ? dayEnd : addDays(dayEnd, 6 - weekday)
}
