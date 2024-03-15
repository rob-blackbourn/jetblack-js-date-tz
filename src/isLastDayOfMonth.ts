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
 * @returns True if the date is the last day of the month.
 */
export function isLastDayOfMonth(date: DateTz): boolean {
  return date.day === daysInMonth(date.year, date.month)
}
