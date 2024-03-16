import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'

/**
 * A time zone aware date class.
 */
export class DateTz {
  /** @ignore */
  private _date: Date
  /** @ignore */
  private _tz: Timezone

  /** Constructs a date.
   *
   * As with the built in Date constructor there are five basic forms of the constructor.
   * In all cases the last parameter is an optional time zone. If absent the default is the local time zone.
   *
   * No date parameters: the current date and time.
   *
   * An integer value  of the number of milliseconds since 1970-01-01T00:00:00+00:00.
   *
   * A date string.
   *
   * A Date object.
   *
   * In addition to the above a DateTz object may be passed.
   */
  constructor(tz?: Timezone)
  constructor(value: number)
  constructor(dateString: string)
  constructor(dateObject: Date)
  constructor(dateTz: DateTz)
  constructor(value: number, tz?: Timezone)
  constructor(dateString: string, tz?: Timezone)
  constructor(dateObject: Date, tz?: Timezone)
  constructor(year: number, month: number, day: number, tz?: Timezone)
  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    tz?: Timezone
  )
  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    tz?: Timezone
  )
  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number,
    tz?: Timezone
  )
  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
    tz?: Timezone
  )
  constructor(...args: any[]) {
    if (args.length === 0) {
      this._date = new Date()
      this._tz = tzLocal
    } else if (args.length == 1) {
      if (args[0] instanceof DateTz) {
        this._tz = args[0].tz
        this._date = new Date(args[0].date)
      } else if (args[0] instanceof Timezone) {
        this._tz = args[0]
        this._date = new Date()
      } else if (typeof args[0] === 'string') {
        // Date only strings are utc
        if (args[0].length <= 'YYYY-MM-DD'.length) {
          this._tz = tzUtc
          this._date = new Date(args[0])
        } else {
          this._tz = tzLocal
          this._date = new Date(args[0])
        }
      } else if (typeof args[0] === 'number' || args[0] instanceof Date) {
        this._tz = tzLocal
        this._date = new Date(args[0])
      } else {
        throw new RangeError('Invalid date')
      }
    } else if (args.length === 2 && args[1] instanceof Timezone) {
      this._tz = args[1]

      if (typeof args[0] === 'string') {
        if (args[0].length <= 'YYYY-MM-DD'.length) {
          this._date = tzUtc.as(new Date(args[0]), this.tz)
        } else {
          this._date = tzLocal.as(new Date(args[0]), this.tz)
        }
      } else if (typeof args[0] === 'number') {
        this._date = new Date(args[0])
      } else if (args[0] instanceof Date) {
        this._date = new Date(args[0])
      } else {
        throw new RangeError('Invalid date')
      }
    } else {
      if (
        args.length > 2 &&
        args[args.length - 1] instanceof Timezone &&
        args.slice(0, args.length - 1).every(x => typeof x === 'number')
      ) {
        this._tz = args[args.length - 1]
        args = args.slice(0, args.length - 1)
      } else if (args.length <= 7 && args.every(x => typeof x === 'number')) {
        this._tz = tzLocal
      } else {
        throw new RangeError('Invalid args')
      }
      const [year, month, day, hours, minutes, seconds, milliseconds] =
        args as number[]
      this._date = this.tz.makeDate(
        year,
        month,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
      )
    }
  }

  /** The Date object. */
  get date() {
    return this._date
  }
  /** The time zone. */
  get tz() {
    return this._tz
  }

  /** The year. */
  get year() {
    return this.tz.year(this.date)
  }
  /** The month, where 1 is January. */
  get month() {
    return this.tz.month(this.date)
  }
  /** The day of the month. */
  get day() {
    return this.tz.day(this.date)
  }
  /** The hours of the day. */
  get hours() {
    return this.tz.hours(this.date)
  }
  /** The minutes of the hour. */
  get minutes() {
    return this.tz.minutes(this.date)
  }
  /** The seconds of the minute. */
  get seconds() {
    return this.tz.seconds(this.date)
  }
  /** The milliseconds of the second. */
  get milliseconds() {
    return this.tz.milliseconds(this.date)
  }

  /** The day of the week. */
  get weekday() {
    return this.tz.weekday(this.date)
  }

  /** The date parts. */
  get parts() {
    return this.tz.dateParts(this.date)
  }

  /** The offset from UTC in minutes. */
  get offset() {
    return this.tz.offset(this.date)
  }

  /** True if the date is subject to daylight savings. */
  get isDaylightSavings() {
    return this.tz.isDaylightSavings(this.date)
  }

  /** Convert to the given timezone. */
  as(tz: Timezone) {
    return new DateTz(this.tz.as(this.date, tz), tz)
  }

  /** Replace the current timezone. */
  with(tz: Timezone) {
    return new DateTz(this.date, tz)
  }

  /** Generate the ISO format. */
  toISOString() {
    return this.tz.toISOString(this.date)
  }

  /** Get the time in milliseconds since 1970-01-01T00:00:00+00:00. */
  getTime() {
    return this.date.getTime()
  }

  /** Return a string representation. */
  toString() {
    return `${this.toISOString()} ${this.tz.name}`
  }
  /** Get the value as a number */
  valueOf() {
    return this.date.valueOf()
  }

  /** @ignore */
  [Symbol.toPrimitive](hint: string): any {
    if (hint === 'string') {
      return this.toString()
    } else if (hint === 'number') {
      return this.valueOf()
    } else {
      // hint === 'default'
      return this.toString()
    }
  }
}
