import { DateTz } from './DateTz'
import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Find the start of the minute.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the minute.
 */
export function startOfMinute(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_MINUTE) *
      MILLISECONDS_IN_MINUTE,
    dateTz.tz
  )
}
