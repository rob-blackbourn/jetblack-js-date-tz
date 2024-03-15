import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Round a date to the start of the current day if before noon;
 * otherwise the start of the next day.
 *
 * ```js
 * import { DateTz, roundDate, tzLocal } from '@jetblack/date-tz'
 * 
 * const morning = new DateTz(2000, 0, 1, 10, 30, tzLocal)
 * console.log(roundDate(morning).toISOString())
 * // returns "2000-01-01T00:00:00+??:??"
 * 
 * const afternoon = new DateTz(2000, 0, 1, 18, 30, tzLocal)
 * console.log(roundDate(afternoon).toISOString())
 * // returns "2000-01-02T00:00:00+??:??"
 * 
 * const noon = new DateTz(2000, 0, 1, 12, 0, tzLocal)
 * console.log(roundDate(noon).toISOString())
 * // returns "2000-01-02T00:00:00+??:??"
 * ```

 * @param date The date to round
 * @returns The start of the day of the rounded date.
 */
export function roundDate(date: DateTz): DateTz {
  return date.hours < 12 ? startOfDay(date) : startOfDay(addDays(date, 1))
}
