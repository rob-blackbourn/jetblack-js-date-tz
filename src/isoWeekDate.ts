import { addDays } from './addDays'
import { diffInCalDays } from './diffInCalDays'
import { startOfYear } from './startOfYear'
import { DateTz } from './DateTz'

/**
 * Find the ISO week date.
 *
 * ```js
 * import { DateTz, isoWeekDate } from '@jetblack/date-tz'
 *
 * console.log(isoWeekDate(new DateTz(2000, 1, 1)))
 * // [1999, 52, 6]
 * ```
 *
 * @param dateTz The date
 * @returns The ISO date as a year, week, and day.
 */
export function isoWeekDate(dateTz: DateTz) {
  const dayAdjust = 4 - (dateTz.weekday || 7)
  const nearestThursday = addDays(dateTz, dayAdjust)
  const isoYear = nearestThursday.year
  const yearStart = startOfYear(nearestThursday)
  const daysToThursday = diffInCalDays(nearestThursday, yearStart)
  const isoWeek = Math.ceil((daysToThursday + 1) / 7)
  const isoDay = 1 + ((10 - dayAdjust) % 7)
  return [isoYear, isoWeek, isoDay]
}
