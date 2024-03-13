import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Find the start of the week for a given date and first day of week.
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param weekStartsOn The first day of the week where 0 is Sunday.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the week.
 */
export function startOfWeekday(dateTz: DateTz, weekStartsOn: number): DateTz {
  const weekday = dateTz.weekday
  const dayStart = startOfDay(dateTz)
  const daysAway = (weekday < weekStartsOn ? 7 : 0) + weekday - weekStartsOn
  return daysAway === 0 ? dayStart : addDays(dayStart, -daysAway)
}
