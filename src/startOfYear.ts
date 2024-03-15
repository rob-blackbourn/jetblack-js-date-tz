import { DateTz } from './DateTz'

/**
 * Find the start of the year for a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the year.
 */
export function startOfYear(dateTz: DateTz): DateTz {
  return new DateTz(dateTz.year, 1, 1, dateTz.tz)
}
