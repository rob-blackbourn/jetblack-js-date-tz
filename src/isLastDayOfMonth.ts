import { DateTz } from './DateTz'
import { daysInMonth } from './daysInMonth'

/**
 * Check if the date is the last day of the month.
 *
 * The time component is ignored.
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the date is the last day of the month.
 */
export function isLastDayOfMonth(date: DateTz): boolean {
  return date.day === daysInMonth(date.year, date.monthIndex)
}
