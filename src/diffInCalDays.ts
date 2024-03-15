import { diffInDays } from './diffInDays'
import { startOfDay } from './startOfDay'
import { tzUtc } from './UTCTimezone'
import { DateTz } from './DateTz'

/**
 * Find the number of whole days between two dates, discarding any time component.
 *
 * ```js
 * import { DateTz, diffInCalDays, tzUtc } from '@jetblack/date-tz'
 *
 * const days1 = diffInCalDays(
 *   new DateTz(2022, 3, 25, tzUtc),
 *   new DateTz(2022, 1, 25, tzUtc)
 * )
 * console.log(days1)
 * // 59
 *
 * // The time part is discarded.
 * const days2 = diffInCalDays(
 *   new DateTz(2022, 3, 25),
 *   new DateTz(2022, 1, 25)
 * )
 * console.log(days2)
 * // 59
 * ```
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInCalDays(leftDate: DateTz, rightDate: DateTz) {
  const lhs = startOfDay(leftDate).as(tzUtc)
  const rhs = startOfDay(rightDate).as(tzUtc)

  return Math.floor(diffInDays(lhs, rhs))
}
