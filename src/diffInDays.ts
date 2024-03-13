import { DateTz } from './DateTz'
import { MILLISECONDS_IN_DAY } from './constants'
import { diffInMilliseconds } from './diffInMilliseconds'

/**
 * Find the number of days between two dates including the fractional component.
 *
 * ```js
 * import { diffInDays, tzUtc } from '@jetblack/date'
 *
 * const days1 = diffInDays(
 *   new Date('2022-03-25T00:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days1)
 * // 59
 *
 * // The time part is retained.
 * const days2 = diffInDays(
 *   new Date('2022-03-25T12:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days2)
 * // 59.5
 * ```
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInDays(leftDate: DateTz, rightDate: DateTz) {
  const elapsedTime = diffInMilliseconds(leftDate, rightDate)
  return elapsedTime / MILLISECONDS_IN_DAY
}
