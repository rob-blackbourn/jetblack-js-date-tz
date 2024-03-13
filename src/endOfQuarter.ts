import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the last moment of the quarter.
 *
 * @category Anchors
 *
 * @param dateTz A date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The last moment of the quarter.
 */
export function endOfQuarter(dateTz: DateTz): DateTz {
  const quarter = quarterOfYear(dateTz)
  const monthIndex = 3 * (quarter - 1) + 2
  const year = dateTz.year
  const day = daysInMonth(year, monthIndex)
  return new DateTz(year, monthIndex, day, 23, 59, 59, 999, dateTz.tz)
}
