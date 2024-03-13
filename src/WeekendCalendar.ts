import { Calendar } from './Calendar'
import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * A calendar where specific days of the week are considered holidays.
 *
 * @category Calendars
 */

export class WeekendCalendar extends Calendar {
  /** @hidden */
  #weekends: number[]

  /**
   * Construct a weekend calendar.
   *
   * @param name An optional calendar name.
   * @param weekends An optional array of week days. Defaults to `[0, 6]` for Saturday and Sunday.
   */
  constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
    super(name)
    this.#weekends = weekends
  }

  /**
   * Check if the date is a weekend.
   *
   * @param date The date.
   * @param tz An optional timezone. Defaults to the local timezone.
   * @returns True is the date is a weekend, otherwise false.
   */
  isWeekend(dateTz: DateTz): boolean {
    const dayOfWeek = dateTz.weekday
    return this.#weekends.some(x => x === dayOfWeek)
  }

  /**
   * Check if the date is a holiday.
   *
   * @param date The date to check.
   * @param tz An optional timezone. Defaults to the local timezone.
   * @returns True if the date is a holiday, otherwise false.
   */
  isHoliday(dateTz: DateTz): boolean {
    return this.isWeekend(dateTz)
  }
}

/**
 * The default calendar where Saturday and Sunday are considered holidays.
 *
 * @Category Calendars
 */
export const calWeekends = new WeekendCalendar()
