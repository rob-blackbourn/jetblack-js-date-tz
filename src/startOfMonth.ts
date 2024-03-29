import { DateTz } from './DateTz'

/**
 * Find the start of the month for a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The start of the month.
 */
export function startOfMonth(dateTz: DateTz): DateTz {
  const { year, month } = dateTz.parts
  return new DateTz(year, month, 1, dateTz.tz)
}
