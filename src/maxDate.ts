import { DateTz } from './DateTz'

/**
 * Find the largest date.
 *
 * ```ts
 * import { DateTz, maxDate } from '@jetblack/date-tz'
 *
 * const d1 = maxDate(
 *   new DateTz(2000, 1, 31),
 *   new DateTz(2000, 1, 1),
 *   new DateTz(2000, 1, 10)
 * )
 * console.log(d1.toISOString())
 * // 2000-01-31T00:00:00.000Z
 *
 * const dates = [
 *   new DateTz(2000, 1, 31),
 *   new DateTz(2000, 1, 1),
 *   new DateTz(2000, 1, 10)
 * ]
 * const d2 = maxDate(...dates) // use the spread operator for an array.
 * console.log(d2.toISOString())
 * // 2000-01-31T00:00:00.000Z
 * ```
 *
 * @category Comparisons
 *
 * @param dates The dates to check.
 * @returns The largest date.
 */
export function maxDate(...dates: DateTz[]): DateTz {
  if (dates.length === 0) {
    throw new RangeError('no dates')
  }

  let largest = dates[0]
  for (let i = 1; i < dates.length; ++i) {
    if (dates[i].getTime() > largest.getTime()) {
      largest = dates[i]
    }
  }
  return largest
}
