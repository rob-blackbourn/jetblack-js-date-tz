import { addDays } from './addDays'
import { diffInCalDays } from './diffInCalDays'
import { startOfYear } from './startOfYear'
import { DateTz } from './DateTz'

/**
 * Find the ISO week of the year.
 *
 * @param dateTz The date.
 * @returns The ISO week.
 */
export function isoWeekOfYear(dateTz: DateTz): number {
  const nearestThursday = addDays(dateTz, 4 - (dateTz.weekday || 7))
  const yearStart = startOfYear(nearestThursday)
  const daysBetween = diffInCalDays(nearestThursday, yearStart)
  const week = Math.ceil((daysBetween + 1) / 7)
  return week
}
