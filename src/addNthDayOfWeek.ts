import { addDays } from './addDays'
import { DateTz } from './DateTz'

/**
 * Add or subtract days of the week.
 *
 * If the start date lies on the specified day of the week and the strictly
 * different flag is false, the current date would be considered the first
 * day of the week.
 *
 * Note that the JavaScript Date object treats 0 as Sunday and 6 as Saturday.
 *
 * ```js
 * import { addNthDayOfWeek } from '@jetblack/date'
 *
 * // Saturday 1 January 1990
 * const d1 = new Date('2000-01-01T00:00:00Z')
 *
 * // The third Thursday of the month.
 * const d2 = addNthDayOfWeek(d1, 3, 4, false)
 * console.log(d2)
 * // Thu Jan 20 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * // The last Friday of the month
 * const d3 = addNthDayOfWeek(endOfMonth(d1), -1, 5, false)
 * console.log(d3)
 * // Fri Jan 28 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param nth The number of week days.
 * @param dow The day of the week where Sunday is 0.
 * @param strictlyDifferent When true the returned date must be different to the start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The nth week day.
 */
export function addNthDayOfWeek(
  dateTz: DateTz,
  nth: number,
  dow: number,
  strictlyDifferent: boolean
): DateTz {
  if (nth === 0) {
    return dateTz
  }

  if (dow < 0 || dow > 6) {
    throw new RangeError('0 <= dow <= 6')
  }

  let diff = dow - dateTz.weekday

  if (diff == 0 && strictlyDifferent) {
    nth += nth >= 0 ? 1 : -1
  }

  if (nth > 0) {
    if (diff < 0) {
      diff += 7
    }

    const adjustedStartDate = addDays(dateTz, diff)
    const endDate = addDays(adjustedStartDate, (nth - 1) * 7)
    return endDate
  } else {
    if (diff > 0) {
      diff -= 7
    }

    const adjustedStartDate = addDays(dateTz, diff)
    const endDate = addDays(adjustedStartDate, (nth + 1) * 7)
    return endDate
  }
}
