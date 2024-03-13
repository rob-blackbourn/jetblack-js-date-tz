import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { WeekendCalendar } from './WeekendCalendar'
import { startOfDay } from './startOfDay'

/**
 * A calendar class which supports weekends and an array of arbitrary dates.
 *
 * The following constructs a holiday calendar for the US in 2020.
 *
 * ```js
 * import { HolidayCalendar } from '@jetblack/date'
 *
 * const calUS = new HolidayCalendar(
 *   'US',
 *   [0, 6], // Saturday and Sunday are always holidays.
 *   [
 *     new Date('2020-01-01'), // Wed: New Year's Day
 *     new Date('2020-01-20'), // Mon: Martin Luther King Jr. Day
 *     new Date('2020-05-25'), // Mon: Memorial Day
 *     new Date('2020-07-03'), // Fri: Independence Day
 *     new Date('2020-09-07'), // Mon: Labor Day
 *     new Date('2020-11-11'), // Wed: Veterans Day
 *     new Date('2020-11-26'), // Thu: Thanksgiving
 *     new Date('2020-12-25')  // Fri: Christmas Day
 *   ]
 * )
 * ```
 *
 * @category Calendars
 */
export class HolidayCalendar extends WeekendCalendar {
  /** @ignore */
  #holidays: Set<number>

  /**
   * Construct a holiday calendar.
   *
   * @param name The calendar name.
   * @param weekends An array of weekdays which are always holidays.
   * @param holidays An array of dates which are holidays.
   */
  constructor(
    name: string,
    weekends: number[] = [0, 6],
    holidays: DateTz[],
    tz: Timezone = tzLocal
  ) {
    super(name, weekends)
    this.#holidays = new Set(holidays.map(x => startOfDay(x).valueOf()))
  }

  isHoliday(dateTz: DateTz): boolean {
    return (
      this.isWeekend(dateTz) || this.#holidays.has(startOfDay(dateTz).valueOf())
    )
  }
}
