import { DateTz } from './DateTz'
import { startOfWeekday } from './startOfWeekday'

/**
 * Find the start of an ISO week for a given date.
 *
 * ISO weeks start on a Monday.
 *
 * @category Anchors
 *
 * @param dateTz A date.
 * @returns The start of the week.
 */
export function startOfISOWeek(dateTz: DateTz): DateTz {
  return startOfWeekday(dateTz, 1)
}
