import { DateTz } from './DateTz'
import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Return the end of the hour for the given date.
 *
 * ```js
 * import { DateTz, endOfHour, tzUtc } from '@jetblack/date-tz'
 *
 * const d1 = new DateTz(2000, 1, 1, tzUtc)
 * const d2 = endOfHour(d1)
 * console.log(d2.toISOString())
 * // 2000-02-01T00:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param dateTz The start date.
 * @returns A new date which is the end of the hour.
 */
export function endOfHour(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_HOUR) * MILLISECONDS_IN_HOUR +
      MILLISECONDS_IN_HOUR -
      1,
    dateTz.tz
  )
}
