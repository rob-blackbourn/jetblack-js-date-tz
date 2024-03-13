import { DateTz } from './DateTz'
import { MILLISECONDS_IN_SECOND } from './constants'

/**
 * Find the start of the second.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the second.
 */
export function startOfSecond(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_SECOND) *
      MILLISECONDS_IN_SECOND,
    dateTz.tz
  )
}
