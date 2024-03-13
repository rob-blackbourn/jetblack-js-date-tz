import { DateTz } from './DateTz'
import { leapSeconds } from './leapSeconds'

/**
 * Find the number of milliseconds between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days milliseconds between the left and right date.
 */
export function diffInMilliseconds(leftDate: DateTz, rightDate: DateTz) {
  const elapsedTime =
    leftDate.getTime() -
    rightDate.getTime() +
    leapSeconds(leftDate, rightDate) * 1000
  return elapsedTime
}
