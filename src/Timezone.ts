import { DatePartResponse } from './types'

const padNumber = (value: number, maxLength: number): string =>
  String(value).padStart(maxLength, '0')

/**
 * The base class for timezones.
 *
 * Two timezones are provided by default: {@link tzLocal} and {@link tzUtc}.
 * There is also a class {@link IANATimezone} which can be used with the time
 * zone database maintained by IANA.
 * All timezone sensitive operations take a timezone as an optional parameter
 * which defaults to tzLocal.
 *
 * There is a tutorial [here](../../pages/guide/timezones.html).
 *
 * The timezone object provides accessors for the common properties of a date
 * such as {@link Timezone['year']}. Here is an example of using the year.
 *
 * ```js
 * import { tzLocal, tzUtc } from '@jetblack/date-tz'
 *
 * const utcMillennium = new Date("2000-01-01T00:00:00Z")
 *
 * // The UTC year will always be 2000
 * console.log(tzUtc.year(utcMillennium) === 2000)
 *
 * // The year in the local timezone will depend where you are.
 * // If the timezone was New York ...
 * console.log(tzLocal.year(utcMillennium) === 1999)
 * ```
 *
 * There are two complimentary methods used for date construction:
 * {@link Timezone.makeDate | makeDate} and {@link Timezone.dateParts | dateParts}.
 * These are used by the library functions to efficiently deconstruct and
 * construct dates for performing calculations.
 *
 * There are two functions specific to timezones:
 * {@link Timezone.isDaylightSavings | isDaylightSavings} and {@link Timezone.toISOString | toISOString}.
 * The JavaScript built in [Date.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 * is only aware of the UTC timezone. This method provides support for any
 * defined timezone.
 *
 * @category Timezone
 */
export abstract class Timezone {
  /** @ignore */
  #name: string

  /**
   * Construct a new timezone.
   *
   * @param name The timezone name.
   */
  constructor(name: string) {
    this.#name = name
  }

  /**
   * Get the name of the timezone.
   */
  get name(): string {
    return this.#name
  }

  /**
   * Create a date from its component parts.
   *
   * @param year The year.
   * @param month The month.
   * @param day The day of the month.
   * @param hours The hour of the day.
   * @param minutes The minute of the day.
   * @param seconds The second of the day.
   * @param milliseconds The millisecond of the day.
   * @returns A new date built from the parts.
   */
  abstract makeDate(
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date

  /**
   * Extract the date parts.
   *
   * If more than one date part is required this is the preferred way to get
   * them, as the timezone calculation is only performed once.
   *
   * ```js
   * const {
   *   year,
   *   month,
   *   day,
   *   weekday,
   *   hours,
   *   minutes,
   *   seconds,
   *   milliseconds
   * } = tz.dateParts(date)
   * ```
   *
   * @param date The date.
   * @param request The request.
   * @returns The date parts.
   */
  abstract dateParts(date: Date): DatePartResponse

  /**
   * The signed offset in minutes from UTC for the given date.
   *
   * @param date The date.
   */
  abstract offset(date: Date): number

  /**
   * The year for the date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1)
   * console.log(tzUtc.year(date))
   * // returns 2000
   * ```
   *
   * @param date The date.
   * @returns The year.
   */
  abstract year(date: Date): number

  /**
   * The month index for the given date where 0 is January.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 1, 1)
   * console.log(tzUtc.month(date))
   * // returns 1
   * ```
   *
   * @param date The date.
   * @returns The month of the date where 1 is January.
   */
  abstract month(date: Date): number

  /**
   * The day of the week for the given date where 0 is Sunday.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1)
   * console.log(tzUtc.weekday(date))
   * // returns 6
   * ```
   *
   * @param date The date.
   * @returns The day of the week where 0 is Sunday.
   */
  abstract weekday(date: Date): number

  /**
   * The day of the month for the given date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1)
   * console.log(tzUtc.day(date))
   * // returns 1
   * ```
   *
   * @param date The date.
   * @returns The day of the month.
   */
  abstract day(date: Date): number

  /**
   * The hour of the day for the given date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1, 12, 15, 30, 123)
   * console.log(tzUtc.hours(date))
   * // returns 12
   * ```
   *
   * @param date The date.
   * @returns The hour of the day.
   */
  abstract hours(date: Date): number

  /**
   * The minute of the day for the given date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1, 12, 15, 30, 123)
   * console.log(tzUtc.minutes(date))
   * // returns 15
   * ```
   *
   * @param date The date.
   * @returns The minute of the day.
   */
  abstract minutes(date: Date): number

  /**
   * The second of the day for a given date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1, 12, 15, 30, 123)
   * console.log(tzUtc.seconds(date))
   * // returns 30
   * ```
   *
   * @param date The date.
   * @returns The second of the day.
   */
  abstract seconds(date: Date): number

  /**
   * The millisecond of the day for a given date.
   *
   * ```js
   * import { tzUtc } from '@jetblack/date-tz'
   *
   * const date = tzUtc.makeDate(2000, 0, 1, 12, 15, 30, 123)
   * console.log(tzUtc.milliseconds(date))
   * // returns 123
   * ```
   *
   * @param date The date.
   * @returns The milliseconds of the day.
   */
  abstract milliseconds(date: Date): number

  /**
   * Find if the date was subject to daylight savings time.
   *
   * @param date The date.
   * @returns True if the date was subject to daylight savings time.
   */
  abstract isDaylightSavings(date: Date): boolean

  /**
   * Makes a new date by taking the date parts using this timezone and making the
   * date with the supplied time zone.
   *
   * @param date A date
   * @param tz A timezone
   * @returns A new date using the date parts from this timezone, constructed with the supplied timezone.
   */
  as(date: Date, tz: Timezone): Date {
    const { year, month, day, hours, minutes, seconds, milliseconds } =
      this.dateParts(date)
    return tz.makeDate(year, month, day, hours, minutes, seconds, milliseconds)
  }
  /**
   * The ISO 8601 date string representation for a given date.
   *
   * @param date The date.
   * @returns The ISO date string.
   */
  toISOString(date: Date) {
    const { year, month, day, hours, minutes, seconds, milliseconds } =
      this.dateParts(date)
    const offset = this.offset(date)
    const offsetSign = Math.sign(offset)
    const offsetHours = offsetSign * Math.trunc(offset / 60)
    const offsetMinutes = offsetSign * (offset % 60)

    const datePart =
      padNumber(year, 4) + '-' + padNumber(month, 2) + '-' + padNumber(day, 2)
    const timePart =
      padNumber(hours, 2) +
      ':' +
      padNumber(minutes, 2) +
      ':' +
      padNumber(seconds, 2) +
      (milliseconds !== 0 ? '.' + padNumber(milliseconds, 3) : '')
    const offsetPart =
      (offsetSign === -1 ? '-' : '+') +
      padNumber(offsetHours, 2) +
      ':' +
      padNumber(offsetMinutes, 2)
    return datePart + 'T' + timePart + offsetPart
  }
}
