import { DateTz } from './DateTz'
import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Adds minutes to a date (or subtracts if negative).
 *
 * ```js
 * import { addMinutes, DateTz } from '@jetblack/date-tz'
 *
 * const d1 = addMinutes(new DateTz(2000, 1, 1), 5)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:05:00.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfMinutes The number of minutes to ad (or subtract if negative).
 * @returns A new date adjusted by the number of minutes.
 */
export function addMinutes(dateTz: DateTz, numberOfMinutes: number): DateTz {
  return new DateTz(
    dateTz.getTime() + numberOfMinutes * MILLISECONDS_IN_MINUTE,
    dateTz.tz
  )
}
