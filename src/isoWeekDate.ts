import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { diffInCalDays } from './diffInCalDays'
import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

/**
 * Find the ISO week date.
 *
 * ```js
 * import { isoWeekDate } from '@jetblack/date'
 *
 * console.log(isoWeekDate(new Date("2000-01-01T00:00:00Z")))
 * // [1999, 52, 6]
 * ```
 *
 * @param dateTz The date
 * @param tz An optional timezone. Defaults to the local timezone.
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
