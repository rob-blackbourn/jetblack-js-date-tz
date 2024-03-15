import { DateTz } from './DateTz'

/**
 * Find the smallest date.
 *
 * ```ts
 * import { DateTz, minDate } from '@jetblack/date-tz'
 *
 * const d1 = minDate(
 *   new DateTz(2000, 1, 31),
 *   new DateTz(2000, 1, 1),
 *   new DateTz(2000, 1, 1)
 * )
 * console.log(d1.toISOString())
 * // 2000-01-01T00:00:00.000Z
 *
 * const dates = [
 *   new DateTz(2000, 1, 31),
 *   new DateTz(2000, 1, 1),
 *   new DateTz(2000, 1, 10)
 * ]
 * const d2 = minDate(...dates) // use the spread operator for an array
 * console.log(d2.toISOString())
 * // 2000-01-01T00:00:00.000Z
 * ```
 *
 * @category Comparisons
 *
 * @param dates The dates to check.
 * @returns The smallest date.
 */
export function minDate(...dates: DateTz[]): DateTz {
  if (dates.length === 0) {
    throw new RangeError('no dates')
  }

  let smallest = dates[0]
  for (let i = 1; i < dates.length; ++i) {
    if (dates[i].getTime() < smallest.getTime()) {
      smallest = dates[i]
    }
  }
  return smallest
}
