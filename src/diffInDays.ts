import { diffInMilliseconds } from './diffInMilliseconds'
import { DateTz } from './DateTz'
import { MILLISECONDS_IN_DAY } from './constants'

/**
 * Find the number of days between two dates including the fractional component.
 *
 * ```js
 * import { DateTz, diffInDays, tzUtc } from '@jetblack/date-tz'
 *
 * const days1 = diffInDays(
 *   new DateTz(2022, 3, 25, tzUtc),
 *   new DateTz(2022, 1, 25, tzUtc)
 * )
 * console.log(days1)
 * // 59
 *
 * // The time part is retained.
 * const days2 = diffInDays(
 *   new DateTz(2022, 3, 25, 12, tzUtc),
 *   new DateTz(2022, 1, 25, tzUtc)
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
