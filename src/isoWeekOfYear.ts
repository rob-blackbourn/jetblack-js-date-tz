import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { diffInCalDays } from './diffInCalDays'
import { startOfYear } from './startOfYear'

/**
 * Find the ISO week of the year.
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The ISO week.
 */
export function isoWeekOfYear(dateTz: DateTz): number {
  const nearestThursday = addDays(dateTz, 4 - (dateTz.weekday || 7))
  const yearStart = startOfYear(nearestThursday)
  const daysBetween = diffInCalDays(nearestThursday, yearStart)
  const week = Math.ceil((daysBetween + 1) / 7)
  return week
}
