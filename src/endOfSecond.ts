import { DateTz } from './DateTz'
import { MILLISECONDS_IN_SECOND } from './constants'

/**
 * Return the end of the second for the given date.
 *
 * ```js
 * import { endOfSecond, tzUtc } from '@jetblack/date'
 *
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfSecond(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-01T00:00:00.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A new date which is the end of the second.
 */
export function endOfSecond(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_SECOND) *
      MILLISECONDS_IN_SECOND +
      MILLISECONDS_IN_SECOND -
      1,
    dateTz.tz
  )
}
