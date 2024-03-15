import { DateTz } from './DateTz'
import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Return the end of the minute for the given date.
 *
 * ```js
 * import { DateTz, endOfMinute, tzUtc } from '@jetblack/date-tz'
 *
 * const d1 = new DateTz(2000, 1, 1, tzUtc)
 * const d2 = endOfMinute(d1)
 * console.log(d2.toISOString())
 * // 2000-02-01T00:00:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A new date which is the end of the minute.
 */
export function endOfMinute(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_MINUTE) *
      MILLISECONDS_IN_MINUTE +
      MILLISECONDS_IN_MINUTE -
      1,
    dateTz.tz
  )
}
