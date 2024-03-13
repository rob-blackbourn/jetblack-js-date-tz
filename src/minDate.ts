import { DateTz } from './DateTz'

/**
 * Find the smallest date.
 *
 * ```ts
 * import { minDate } from '@jetblack/date'
 *
 * const d1 = minDate(
 *   new Date('2000-01-31T00:00:00Z'),
 *   new Date('2000-01-01T00:00:00Z'),
 *   new Date('2000-01-10T00:00:00Z')
 * )
 * console.log(d1.toISOString())
 * // 2000-01-01T00:00:00.000Z
 *
 * const dates = [
 *   new Date('2000-01-31T00:00:00Z'),
 *   new Date('2000-01-01T00:00:00Z'),
 *   new Date('2000-01-10T00:00:00Z')
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
