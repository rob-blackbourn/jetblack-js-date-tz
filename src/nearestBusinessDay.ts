import { addDays } from './addDays'
import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'
import { DateTz } from './DateTz'

/**
 * Find the nearest business date.
 *
 * @category Miscellaneous
 *
 * @param dateTz The start date.
 * @param preferForward If true a future date is preferred if both directions have the same cost. Defaults to true.
 * @param cal The calendar to use to identify business days. Defaults to the weekend calendar.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The nearest business date.
 */
export function nearestBusinessDay(
  dateTz: DateTz,
  preferForward: boolean = true,
  cal: Calendar = calWeekends
): DateTz {
  if (!cal.isHoliday(dateTz)) {
    return dateTz
  }
  let forwardDate = addDays(dateTz, 1)
  let backwardDate = addDays(dateTz, -1)

  while (true) {
    const isForwardHoliday = cal.isHoliday(forwardDate)
    const isBackwardHoliday = !cal.isHoliday(backwardDate)
    if (!isForwardHoliday && (preferForward || isBackwardHoliday)) {
      return forwardDate
    } else if (!isBackwardHoliday) {
      return backwardDate
    }
    forwardDate = addDays(forwardDate, 1)
    backwardDate = addDays(backwardDate, -1)
  }
}
