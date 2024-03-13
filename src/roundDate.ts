import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Round a date to the start of the current day if before noon;
 * otherwise the start of the next day.
 *
 * ```js
 * import { roundDate, tzLocal } from '@jetblack/date'
 * 
 * const morning = tzLocal.makeDate(2000, 0, 1, 10, 30)
 * console.log(tzLocal.toISOString(roundDate(morning, tzLocal)))
 * // returns "2000-01-01T00:00:00+??:??"
 * 
 * const afternoon = tzLocal.makeDate(2000, 0, 1, 18, 30)
 * console.log(tzLocal.toISOString(roundDate(afternoon, tzLocal)))
 * // returns "2000-01-02T00:00:00+??:??"
 * 
 * const noon = tzLocal.makeDate(2000, 0, 1, 12, 0)
 * console.log(tzLocal.toISOString(roundDate(noon, tzLocal)))
 * // returns "2000-01-02T00:00:00+??:??"
 * ```

 * @param date The date to round
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day of the rounded date.
 */
export function roundDate(date: DateTz): DateTz {
  return date.hours < 12 ? startOfDay(date) : startOfDay(addDays(date, 1))
}
