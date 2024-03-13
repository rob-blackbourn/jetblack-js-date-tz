import { addDays } from './addDays'
import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'
import { DateTz } from './DateTz'

/**
 * Add business days to a date (or subtract if negative).
 *
 * If a calendar is not specified the {@linkcode calWeekends} calendar is used.
 *
 * ```js
 * import { addBusinessDays } from '@jetblack/date'
 *
 * // Fri 7 Jan 2000
 * const date = addBusinessDays(new Date('2000-01-07T00:00:00Z'), 1)
 * console.log(date.getTime() === new Date('2000-01-10T00:00:00Z').getTime())
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param count The number of days to add (or subtract if negative).
 * @param cal The calendar to use to identify dates which are holidays. Defaults to the {@linkcode calWeekends} calendar.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by business days.
 */
export function addBusinessDays(
  dateTz: DateTz,
  count: number,
  cal: Calendar = calWeekends
): DateTz {
  const sign = count > 0 ? 1 : -1

  while (count !== 0) {
    dateTz = addDays(dateTz, sign)
    count -= sign

    while (cal.isHoliday(dateTz)) {
      dateTz = addDays(dateTz, sign)
    }
  }
  return dateTz
}
