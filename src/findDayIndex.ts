import { DateTz } from './DateTz'

/**
 * Find the index of the first date with the given day of the month.
 *
 * @param dates The dates
 * @param day The day of the month to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findDayIndex(dates: DateTz[], day: number): number {
  return dates.findIndex(date => date.day === day)
}
