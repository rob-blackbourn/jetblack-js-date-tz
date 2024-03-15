import { startOfWeek } from './startOfWeek'
import { weekYear } from './weekYear'
import { DateTz } from './DateTz'

/**
 * Find the first week of the year for the week year of a given date.
 *
 * @category Anchors
 *
 * @param dateTz The date.
 * @returns The date of the first week of the year.
 */
export function startOfWeekYear(dateTz: DateTz): DateTz {
  const year = weekYear(dateTz)
  const firstWeek = new DateTz(year, 1, 1, dateTz.tz)
  return startOfWeek(firstWeek)
}
