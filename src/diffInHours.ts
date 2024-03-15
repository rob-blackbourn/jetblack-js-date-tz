import { diffInMilliseconds } from './diffInMilliseconds'
import { DateTz } from './DateTz'
import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Find the number of hours between two dates including fractional minutes.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInHours(leftDate: DateTz, rightDate: DateTz) {
  const elapsedTime = diffInMilliseconds(leftDate, rightDate)
  return elapsedTime / MILLISECONDS_IN_HOUR
}
