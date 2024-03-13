import { addDays } from './addDays'
import { DateTz } from './DateTz'
import { startOfDay } from './startOfDay'

/**
 * Find the start of the week for a given date.
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the week.
 */
export function startOfWeek(dateTz: DateTz): DateTz {
  const weekday = dateTz.weekday
  const dayStart = startOfDay(dateTz)
  return weekday === 0 ? dayStart : addDays(dayStart, -weekday)
}
