import { DateTz } from './DateTz'

/**
 * Add days to a date (or subtract if negative)
 *
 * Daylight savings time (DST) presents an issue for date arithmetic.
 *
 * The following example adds three days to the Saturday before the clocks
 * change using the local timezone (London) and UTC (which does not have DST).
 *
 * When using the local timezone the "naturally correct" answer is returned.
 * However, the elapsed time will be an hour less than when using UTC.
 *
 * Keeping the time change constant (as with UTC) can be useful when plotting
 * data, or doing time series calculations (rolling averages, resampling, etc.).
 *
 * ```js
 * import { addDays, tzLocal, tzUtc } from '@jetblack/date'
 *
 * // The local timezone here is London.
 * // In London on Sunday March 26 2000 the clocks go forward 1 hour.
 * const d1 = new Date('2000-03-25T12:00:00')
 * const d2 = addDays(d1, 3, tzLocal)
 * const d3 = addDays(d1, 3, tzUtc)
 * console.log(d1.toString()) // Sat Mar 25 2000 12:00:00 GMT+0000 (Greenwich Mean Time)
 * console.log(d2.toString()) // Tue Mar 28 2000 12:00:00 GMT+0100 (British Summer Time)
 * console.log(d3.toString()) // Tue Mar 28 2000 13:00:00 GMT+0100 (British Summer Time)
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfDays The number of days to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of days.
 */
export function addDays(dateTz: DateTz, numberOfDays: number): DateTz {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year,
    monthIndex,
    day + numberOfDays,
    hours,
    minutes,
    seconds,
    milliseconds,
    dateTz.tz
  )
}
