/**
 * Adds milliseconds to a date (or subtracts if negative).
 *
 * ```js
 * import { addMilliseconds } from '@jetblack/date'
 *
 * const d1 = addMilliseconds(new Date('2000-01-01T00:00:00.000'), 111)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:00:00.111Z
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMilliseconds The number of milliseconds to add (or subtract if negative).
 * @returns A new date adjusted by the number of milliseconds.
 */

import { DateTz } from './DateTz'

export function addMilliseconds(
  dateTz: DateTz,
  numberOfMilliseconds: number
): DateTz {
  return new DateTz(dateTz.getTime() + numberOfMilliseconds, dateTz.tz)
}
