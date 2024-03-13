import { DateTz } from './DateTz'
import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Find the start of the hour.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the hour.
 */
export function startOfHour(dateTz: DateTz): DateTz {
  return new DateTz(
    Math.trunc(dateTz.getTime() / MILLISECONDS_IN_HOUR) * MILLISECONDS_IN_HOUR,
    dateTz.tz
  )
}
