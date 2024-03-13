import { DateTz } from './DateTz'

/**
 * Add years to a date (or subtract if negative).
 *
 * Note how surplus days for a leap year are added.
 *
 * ```js
 * import { addYears, tzUtc } from '@jetblack/date'
 *
 * // There is no 29 February in 2001.
 * const d1 = addYears(new Date('2000-02-29'), 1, tzUtc)
 * console.log(d1.toString())
 * // Thu Mar 01 2001 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * // 2004 is also a leap year.
 * const d2 = addYears(new Date('2000-02-29'), 4, tzUtc)
 * console.log(d2.toString())
 * // Sun Feb 29 2004 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfYears The number of years to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of years.
 */
export function addYears(dateTz: DateTz, numberOfYears: number): DateTz {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year + numberOfYears,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
    dateTz.tz
  )
}
