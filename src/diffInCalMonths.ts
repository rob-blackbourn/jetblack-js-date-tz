import { startOfDay } from './startOfDay'
import { tzUtc } from './UTCTimezone'
import { DateTz } from './DateTz'

/**
 * Find the number of whole months between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of months between two dates.
 */
export function diffInCalMonths(leftDate: DateTz, rightDate: DateTz): number {
  const lhs = startOfDay(leftDate).as(tzUtc)
  const rhs = startOfDay(rightDate).as(tzUtc)
  const yearDiff = lhs.year - rhs.year
  const monthDiff = lhs.month - rhs.month
  const dayDiff = lhs.day - rhs.day

  return yearDiff * 12 + monthDiff - (dayDiff < 0 ? 1 : 0)
}
