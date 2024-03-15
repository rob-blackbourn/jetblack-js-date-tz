import { DateTz } from './DateTz'

/**
 * Adds milliseconds to a date (or subtracts if negative).
 *
 * ```js
 * import { addMilliseconds, DateTz } from '@jetblack/date-tz'
 *
 * const d1 = addMilliseconds(new DateTz(2000, 1, 1, 111)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:00:00.111Z
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfMilliseconds The number of milliseconds to add (or subtract if negative).
 * @returns A new date adjusted by the number of milliseconds.
 */
export function addMilliseconds(
  dateTz: DateTz,
  numberOfMilliseconds: number
): DateTz {
  return new DateTz(dateTz.getTime() + numberOfMilliseconds, dateTz.tz)
}
