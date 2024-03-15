import { DateTz } from './DateTz'
import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Add hours to a date (or subtract if negative).
 *
 * Daylight savings time is handled appropriately.
 *
 * ```js
 * import { addHours, DateTz } from '@jetblack/date-tz'
 *
 * // The local timezone here is London.
 * // In London on Sunday March 26 2000 the clocks go forward 1 hour.
 * const d1 = new DateTz(2000, 3, 26)
 * console.log(d1)
 * // Sun Mar 26 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * const d2 = addHours(d1, 1)
 * console.log(d2)
 * // Sun Mar 26 2000 02:00:00 GMT+0100 (British Summer Time)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfHours The number of hours to add (or subtract if negative).
 * @returns A new date adjusted by the number of hours.
 */
export function addHours(dateTz: DateTz, numberOfHours: number): DateTz {
  return new DateTz(
    dateTz.getTime() + numberOfHours * MILLISECONDS_IN_HOUR,
    dateTz.tz
  )
}
