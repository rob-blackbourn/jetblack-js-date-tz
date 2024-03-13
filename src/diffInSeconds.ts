import { DateTz } from './DateTz'
import { MILLISECONDS_IN_SECOND } from './constants'
import { diffInMilliseconds } from './diffInMilliseconds'

/**
 * Find the number of seconds between two dates including fractional milliseconds.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInSeconds(leftDate: DateTz, rightDate: DateTz) {
  const elapsedTime = diffInMilliseconds(leftDate, rightDate)
  return elapsedTime / MILLISECONDS_IN_SECOND
}
