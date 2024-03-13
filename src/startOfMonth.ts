import { DateTz } from './DateTz'

/**
 * Find the start of the month for a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the month.
 */
export function startOfMonth(dateTz: DateTz): DateTz {
  const { year, monthIndex } = dateTz.parts
  return new DateTz(year, monthIndex, 1, dateTz.tz)
}
