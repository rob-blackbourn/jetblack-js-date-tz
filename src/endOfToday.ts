import { endOfDay } from './endOfDay'
import { tzLocal } from './LocalTimezone'
import { DateTz } from './DateTz'
import { Timezone } from './Timezone'

/**
 * The end of today.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The end of the current day.
 */
export function endOfToday(tz: Timezone = tzLocal): DateTz {
  return endOfDay(new DateTz(new Date(), tz))
}
