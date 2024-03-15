import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the last moment of the quarter.
 *
 * @category Anchors
 *
 * @param dateTz A date
 * @returns The last moment of the quarter.
 */
export function endOfQuarter(dateTz: DateTz): DateTz {
  const quarter = quarterOfYear(dateTz)
  const month = 3 * (quarter - 1) + 3
  const year = dateTz.year
  const day = daysInMonth(year, month)
  return new DateTz(year, month, day, 23, 59, 59, 999, dateTz.tz)
}
