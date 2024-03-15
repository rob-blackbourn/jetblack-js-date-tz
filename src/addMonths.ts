import { DateTz } from './DateTz'

/**
 * Add months to a date (or subtract if negative).
 *
 * The day of the month is kept constant if possible. Where the destination
 * has less days at the end of the month, the surplus days are added.
 *
 * ```js
 * import { addMonths, tzUtc, DateTz } from '@jetblack/date-tz'
 *
 * // The day of the month is kept constant if possible.
 * const d1 = new DateTz(2000, 1, 12, tzUtc)
 * console.log(d1.toString())
 * // Wed Jan 12 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * const d2 = addMonths(d1, 1)
 * console.log(d2.toString())
 * // Sat Feb 12 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * // If there are less days in the following month the surplus days are added.
 * const d3 = new DateTz(2000, 1, 31, tzUtc)
 * console.log(d3.toString())
 * // Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * const d4 = addMonths(d3, 1)
 * console.log(d4.toString())
 * // Thu Mar 02 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfMonths The number of months to add (or subtract if negative)
 * @returns A new date adjusted by the number of months.
 */
export function addMonths(dateTz: DateTz, numberOfMonths: number): DateTz {
  const { year, month, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year,
    month + numberOfMonths,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
    dateTz.tz
  )
}
