import { DateTz } from './DateTz'

/**
 * Find the start of the year for a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the year.
 */
export function startOfYear(dateTz: DateTz): DateTz {
  return new DateTz(dateTz.year, 0, 1, dateTz.tz)
}
