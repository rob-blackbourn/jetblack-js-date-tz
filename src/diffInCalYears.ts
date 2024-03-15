import { diffInCalMonths } from './diffInCalMonths'
import { DateTz } from './DateTz'

/**
 * Find the number of whole years between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of years between two dates.
 */
export function diffInCalYears(leftDate: DateTz, rightDate: DateTz): number {
  return Math.trunc(diffInCalMonths(leftDate, rightDate) / 12)
}
