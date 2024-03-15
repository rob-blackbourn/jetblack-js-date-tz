import { DateTz } from './DateTz'

/**
 * The base class for calendars.
 *
 * Calendars are required when working with functions that require
 * knowledge of weekends and holidays (e.g. {@link addBusinessDays}).
 *
 * There is a tutorial [here](../../pages/guide/calendars.html).
 *
 * Two calendar classes are defined: {@link WeekendCalendar} and
 * {@link HolidayCalendar}. The object {@link calWeekends} is the
 * default calendar. It simply defines Saturday and Sunday as holiday
 * dates.
 *
 * This is how the {@link WeekendCalendar} is defined.
 *
 * ```ts
 * import { Calendar, DateTz } from '@jetblack/date-tz'
 *
 * export class WeekendCalendar extends Calendar {
 *   #weekends: number[]
 *
 *   constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
 *     super(name)
 *     this.#weekends = weekends
 *   }
 *
 *   isWeekend(date: DateTz): boolean {
 *     const dayOfWeek = date.weekday
 *     return this.#weekends.some(x => x === dayOfWeek)
 *   }
 *
 *   isHoliday(date: DateTz): boolean {
 *     return this.isWeekend(date)
 *   }
 * }
 * ```
 *
 * @category Calendars
 */
export abstract class Calendar {
  /** @hidden */
  #name: string

  /**
   * Construct a calendar.
   *
   * @param name The calendar name.
   */
  constructor(name: string) {
    this.#name = name
  }

  /**
   * Get the calendar name.
   */
  get name(): string {
    return this.#name
  }

  /**
   * Check if the date is a holiday.
   *
   * @param dateTz The date to check.
   * @returns True if the date is a holiday, otherwise false.
   */
  abstract isHoliday(dateTz: DateTz): boolean
}
