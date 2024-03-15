import { addBusinessDays } from './addBusinessDays'
import { calWeekends } from './WeekendCalendar'
import { nearestBusinessDay } from './nearestBusinessDay'
import { Calendar } from './Calendar'
import { DateTz } from './DateTz'

/**
 * Business day conventions.
 *
 * These rules determine adjustments made to dates when dealing with holidays.
 * The most obvious rule is whether to move forwards, backwards, or to find the
 * nearest non-holiday.
 *
 * The modified rules determine what to do when the adjustment is at the end of
 * the month.
 */
export enum BusinessDayConvention {
  /** No adjustment */
  NONE = 0,
  /** Adjust to the nearest business day */
  NEAREST = 1,
  /** Adjust to the nearest business day before the current day */
  PRECEDING = 2,
  /** Adjust to the nearest business day after the current day */
  FOLLOWING = 3,
  /** Adjust to the nearest business day after the current day withing the month; otherwise adjust preceding */
  MODIFIED_PRECEDING = 4,
  /** Adjust to the nearest business day after the current day withing the month; otherwise adjust following */
  MODIFIED_FOLLOWING = 5
}

/**
 * Adjusts a non-business day to the appropriate nearest business day.
 *
 * ```js
 * import { adjustBusinessDay, BusinessDayConvention, DateTz } from '@jetblack/date-tz'
 *
 * const d1 = new DateTz(2000, 1, 1)
 * console.log(d1)
 * // Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * const d2 = adjustBusinessDay(d1, BusinessDayConvention.FOLLOWING)
 * console.log(d2.toString())
 * // Mon Jan 03 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * const d3 = adjustBusinessDay(d1, BusinessDayConvention.PRECEDING)
 * console.log(d3.toString())
 * // Fri Dec 31 1999 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * @param dateTz The date.
 * @param convention The business day conventions. Defaults to BusinessDayConvention.FOLLOWING.
 * @param prefer_forward If true prefer the nearest business day in the future. Defaults to true.
 * @param cal An optional holiday calendar. Defaults to calWeekend.
 * @returns The adjusted date.
 */
export function adjustBusinessDay(
  dateTz: DateTz,
  convention: BusinessDayConvention = BusinessDayConvention.FOLLOWING,
  prefer_forward: boolean = true,
  cal: Calendar = calWeekends
): DateTz {
  if (convention === BusinessDayConvention.NONE || !cal.isHoliday(dateTz)) {
    return dateTz
  } else if (convention === BusinessDayConvention.NEAREST) {
    return nearestBusinessDay(dateTz, prefer_forward, cal)
  } else if (convention == BusinessDayConvention.FOLLOWING) {
    return addBusinessDays(dateTz, 1, cal)
  } else if (convention == BusinessDayConvention.PRECEDING) {
    return addBusinessDays(dateTz, -1, cal)
  } else if (convention == BusinessDayConvention.MODIFIED_FOLLOWING) {
    const adjustedDate = addBusinessDays(dateTz, 1, cal)

    if (dateTz.month == dateTz.month) {
      return adjustedDate
    } else {
      return addBusinessDays(dateTz, -1, cal)
    }
  } else if (convention == BusinessDayConvention.MODIFIED_PRECEDING) {
    const adjustedDate = addBusinessDays(dateTz, -1, cal)

    if (dateTz.month === dateTz.month) {
      return adjustedDate
    } else {
      return addBusinessDays(dateTz, 1, cal)
    }
  } else {
    throw new RangeError('Invalid business day convention')
  }
}
