import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'

export class DateTz {
  private _date: Date
  private _tz: Timezone

  constructor()
  constructor(value: number)
  constructor(dateString: string)
  constructor(dateObject: Date)
  constructor(dateTz: DateTz)
  constructor(tz: Timezone)
  constructor(value: number, tz: Timezone)
  constructor(dateString: string, tz: Timezone)
  constructor(dateObject: Date, tz: Timezone)
  constructor(year: number, month: number, tz?: Timezone)
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

  get date() {
    return this._date
  }
  get tz() {
    return this._tz
  }

  get year() {
    return this.tz.year(this.date)
  }
  get month() {
    return this.tz.month(this.date)
  }
  get day() {
    return this.tz.day(this.date)
  }
  get hours() {
    return this.tz.hours(this.date)
  }
  get minutes() {
    return this.tz.minutes(this.date)
  }
  get seconds() {
    return this.tz.seconds(this.date)
  }
  get milliseconds() {
    return this.tz.milliseconds(this.date)
  }

  get weekday() {
    return this.tz.weekday(this.date)
  }

  get parts() {
    return this.tz.dateParts(this.date)
  }

  get offset() {
    return this.tz.offset(this.date)
  }

  get isDaylightSavings() {
    return this.tz.isDaylightSavings(this.date)
  }

  as(tz: Timezone) {
    return new DateTz(this.tz.as(this.date, tz), tz)
  }

  toISOString() {
    return this.tz.toISOString(this.date)
  }

  getTime() {
    return this.date.getTime()
  }

  toString() {
    return `${this.date.toISOString()} ${this.tz.name}`
  }
  valueOf() {
    return this.date.valueOf()
  }

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
