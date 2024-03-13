import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { startOfMonth } from './startOfMonth'
import { Timezone } from './Timezone'

/**
 * Find the start of the current month.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the current month.
 */
export function startOfCurrentMonth(tz: Timezone = tzLocal): DateTz {
  return startOfMonth(new DateTz(tz))
}
