import { DateTz } from './DateTz'

/**
 * Compares two dates ascending.
 *
 * ```js
 * import { compareDateAsc } from '@jetblack/date'
 *
 * const a = [
 *   new Date('2000-07-01'),
 *   new Date('2000-05-01'),
 *   new Date('2000-06-01')
 * ]
 * console.log(a.sort(compareDateAsc))
 * // 0: Mon May 01 2000 01:00:00 GMT+0100 (British Summer Time)
 * // 1: Thu Jun 01 2000 01:00:00 GMT+0100 (British Summer Time)
 * // 2: Sat Jul 01 2000 01:00:00 GMT+0100 (British Summer Time)
 * ```
 *
 * @category Comparisons
 *
 * @param a The first date.
 * @param b The second date.
 * @returns 1 if the first date is greater than the second date, -1 if the first date is less than the last date, otherwise 0.
 */
export function compareDateAsc(a: DateTz, b: DateTz): number {
  return Math.sign(a.getTime() - b.getTime())
}
