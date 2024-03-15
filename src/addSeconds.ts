import { DateTz } from './DateTz'
import { MILLISECONDS_IN_SECOND } from './constants'

/**
 * Adds seconds to a date (or subtracts if negative).
 *
 * ```js
 * import { addSeconds, DateTz } from '@jetblack/date-tz'
 *
 * const d1 = addSeconds(new DateTz(2000, 1, 1), 61)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:01:01.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfSeconds The number of seconds to add.
 * @returns A new date adjusted by the number of seconds.
 */
export function addSeconds(dateTz: DateTz, numberOfSeconds: number): DateTz {
  return new DateTz(
    dateTz.getTime() + numberOfSeconds * MILLISECONDS_IN_SECOND,
    dateTz.tz
  )
}
