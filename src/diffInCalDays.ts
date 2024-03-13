import { diffInDays } from './diffInDays'
import { tzUtc } from './UTCTimezone'
import { startOfDay } from './startOfDay'
import { DateTz } from './DateTz'

/**
 * Find the number of whole days between two dates, discarding any time component.
 *
 * ```js
 * import { diffInCalDays, tzUtc } from '@jetblack/date'
 *
 * const days1 = diffInCalDays(
 *   new Date('2022-03-25T00:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days1)
 * // 59
 *
 * // The time part is discarded.
 * const days2 = diffInCalDays(
 *   new Date('2022-03-25T12:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days2)
 * // 59
 * ```
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInCalDays(leftDate: DateTz, rightDate: DateTz) {
  const lhs = startOfDay(leftDate).as(tzUtc)
  const rhs = startOfDay(rightDate).as(tzUtc)

  return Math.floor(diffInDays(lhs, rhs))
}
