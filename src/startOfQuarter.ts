import { DateTz } from './DateTz'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the start of the quarter for a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the quarter.
 */
export function startOfQuarter(dateTz: DateTz): DateTz {
  const quarter = quarterOfYear(dateTz)
  const monthIndex = 3 * (quarter - 1)
  return new DateTz(dateTz.year, monthIndex, 1, dateTz.tz)
}
