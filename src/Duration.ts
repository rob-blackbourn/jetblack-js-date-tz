const SECONDS_IN_DAY = 24 * 60 * 60

const DURATION_PATTERN =
  /^(?<sign>-?[+-])?P((?<years>-?[+-]?\d+([.]\d+)?)Y)?((?<months>-?[+-]?\d+([.]\d+)?)M)?((?<weeks>-?[+-]?\d+([.]\d+)?)W)?((?<days>-?[+-]?\d+([.]\d+)?)D)?(T((?<hours>-?[+-]?\d+([.]\d+)?)H)?((?<minutes>-?[+-]?\d+([.]\d+)?)M)?((?<seconds>-?[+-]?\d+([.]\d+)?)S)?)?$/

/** @ignore */
function fromValues(
  years: number,
  months: number,
  weeks: number = 0,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): [number, number, number, number, number, number, number] {
  const totalMinutes = minutes + Math.trunc(seconds / 60)
  const totalHours = hours + Math.trunc(totalMinutes / 60)
  const totalDays = days + Math.trunc(totalHours / 24)
  const totalMonths = years * 12 + months

  return [
    Math.trunc(totalMonths / 12),
    totalMonths % 12,
    weeks + Math.trunc(totalDays / 7),
    totalDays % 7,
    totalHours % 24,
    totalMinutes % 60,
    seconds % 60
  ]
}

/** @ignore */
function fromString(
  text: string
): [number, number, number, number, number, number, number] {
  const match = DURATION_PATTERN.exec(text)
  if (match == null || match.groups == null) {
    throw new Error('Failed to parse duration')
  }
  const sign = match.groups.sign === '-' ? -1 : 1
  const years = sign * parseFloat(match.groups.years || '0'),
    months = sign * parseFloat(match.groups.months || '0'),
    weeks = sign * parseFloat(match.groups.weeks || '0'),
    days = sign * parseFloat(match.groups.days || '0'),
    hours = sign * parseFloat(match.groups.hours || '0'),
    minutes = sign * parseFloat(match.groups.minutes || '0'),
    seconds = sign * parseFloat(match.groups.seconds || '0')

  return fromValues(years, months, weeks, days, hours, minutes, seconds)
}

/** @ignore */
function fromNumber(
  value: number
): [number, number, number, number, number, number, number] {
  let dateValue = Math.trunc(value / SECONDS_IN_DAY)
  const years = Math.trunc(dateValue / 360)
  dateValue = dateValue % 360
  const months = Math.trunc(dateValue / 30)
  dateValue = dateValue % 30
  const days = dateValue
  let timeValue = value % SECONDS_IN_DAY
  const hours = Math.trunc(timeValue / 60 / 60)
  timeValue = timeValue % (60 * 60)
  const minutes = Math.trunc(timeValue / 60)
  const seconds = timeValue % 60
  return [
    years,
    months,
    Math.trunc(days / 7),
    days % 7,
    hours,
    minutes,
    seconds
  ]
}

/** @ignore */
function argsToValues(
  ...args: any[]
): [number, number, number, number, number, number, number] {
  if (args.length == 0) {
    return [0, 0, 0, 0, 0, 0, 0]
  } else if (args.length === 1) {
    const value = args[0]
    if (typeof value === 'string') {
      return fromString(value)
    } else if (typeof value === 'number') {
      return fromNumber(value)
    } else {
      return [NaN, NaN, NaN, NaN, NaN, NaN, NaN]
    }
  } else {
    return fromValues(
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6]
    )
  }
}

/**
 * Represents an ISO 8601 duration.
 *
 * Here we add a day.
 *
 *  ```js
 * import { DateTz, Duration } from '@jetblack/date-tz'
 *
 * const duration = new Duration('P1D')
 * const d1 = addDuration(new DateTz(2000, 1, 1), duration)
 * console.log(d1)
 * // Sun Jan 02 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * Note that durations may be negative.
 *
 * ```js
 * import { DateTz, Duration } from '@jetblack/date-tz'
 *
 * const duration = new Duration('-P1D')
 * const d1 = addDuration(new DateTz(2000, 1, 1), duration)
 * console.log(d1)
 * // Fri Dec 31 1999 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 * @category Duration
 */
export class Duration {
  /** @ignore */
  /** @ignore */
  static readonly #ZERO_STRING = 'PT0S'

  /** @ignore */
  #years: number
  /** @ignore */
  #months: number
  /** @ignore */
  #weeks: number
  /** @ignore */
  #days: number
  /** @ignore */
  #hours: number
  /** @ignore */
  #minutes: number
  /** @ignore */
  #seconds: number

  /**
   * Constructs a duration.
   *
   * The resulting duration will be simplified. For example 12 months will
   * become 1 year and 0 months.
   *
   * From component values.
   *
   * ```js
   * const duration = new Duration(2, 14, 0, 0, 24)
   * console.log(duration.toString())
   * // P3Y2M1D
   * ```
   *
   * From a string.
   *
   * ```js
   * const duration = new Duration('P2Y14MT24H')
   * console.log(duration.toString())
   * // P3Y2M1D
   * ```
   *
   * From a value.
   *
   * ```js
   * const duration = new Duration(98582400)
   * console.log(duration.toString())
   * // P3Y2M1D
   * ```
   *
   * @param years The years.
   * @param months The months.
   * @param weeks The weeks.
   * @param days The days.
   * @param hours The hours.
   * @param minutes The minutes.
   * @param seconds The seconds.
   */
  constructor(
    years: number,
    months: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
  )
  /**
   * Constructs a year from the string representation, the number of seconds,
   * or another duration object.
   *
   * @param value The duration as a string, number, or duration.
   */
  constructor(value: string | number | Duration)

  constructor(...args: any[]) {
    if (argsToValues.length === 1 && args[0] instanceof Duration) {
      const value = args[0] as Duration
      this.#years = value.#years
      this.#months = value.#months
      this.#weeks = value.#months
      this.#days = value.#days
      this.#hours = value.#hours
      this.#minutes = value.#minutes
      this.#seconds = value.#seconds
    } else {
      ;[
        this.#years,
        this.#months,
        this.#weeks,
        this.#days,
        this.#hours,
        this.#minutes,
        this.#seconds
      ] = argsToValues(...args)
    }
  }

  /** @ignore */
  #countSigns(): [number, number] {
    let positiveCount = 0,
      negativeCount = 0
    const values = [
      this.#years,
      this.#months,
      this.#weeks,
      this.#days,
      this.#hours,
      this.#minutes,
      this.#seconds
    ]
    for (const value of values) {
      if (value > 0) {
        ++positiveCount
      } else if (value < 0) {
        ++negativeCount
      }
    }
    return [positiveCount, negativeCount]
  }

  /**
   * Creates a string representation of the duration.
   *
   * @returns An ISO 8601 duration.
   */
  toString(): string {
    const [positiveCount, negativeCount] = this.#countSigns()
    if (positiveCount === 0 && negativeCount === 0) {
      return Duration.#ZERO_STRING
    }

    const sign = negativeCount > positiveCount ? -1 : 1

    let datePart = 'P'
    if (this.#years !== 0) {
      datePart += sign * this.#years + 'Y'
    }
    if (this.#months !== 0) {
      datePart += sign * this.#months + 'M'
    }
    if (this.#weeks !== 0) {
      datePart += sign * this.#weeks + 'W'
    }
    if (this.#days !== 0) {
      datePart += sign * this.#days + 'D'
    }

    let timePart = 'T'
    if (this.#hours !== 0) {
      timePart += sign * this.#hours + 'H'
    }
    if (this.#minutes !== 0) {
      timePart += sign * this.#minutes + 'M'
    }
    if (this.#seconds !== 0) {
      timePart += sign * this.#seconds + 'S'
    }

    if (timePart !== 'T') {
      datePart += timePart
    }

    if (sign === -1) {
      datePart = '-' + datePart
    }

    return datePart
  }

  /**
   * Gets the years.
   */
  get years(): number {
    return this.#years
  }

  /**
   * Sets the years.
   */
  set years(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#years = Math.trunc(value)
  }

  /**
   * Gets the months.
   */
  get months(): number {
    return this.#months
  }

  /**
   * Sets the months.
   *
   * If the value is greater than or equal to 12 the duration is simplified.
   */
  set months(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#months = Math.trunc(value) % 12
    this.years += Math.trunc(value / 12)
  }

  /**
   * Gets the weeks.
   */
  get weeks(): number {
    return this.#weeks
  }

  /**
   * Sets the weeks.
   */
  set weeks(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#weeks = value
  }

  /**
   * Gets the days.
   */
  get days(): number {
    return this.#days
  }

  /**
   * Sets the days.
   *
   * If the value is greater than or equal to 7 the duration is simplified.
   */
  set days(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#days = Math.trunc(value) % 7
    this.weeks += Math.trunc(value / 7)
  }

  /**
   * Gets the hours.
   */
  get hours(): number {
    return this.#hours
  }

  /**
   * Sets the hours.
   *
   * If the value is greater than or equal to 24 the duration is simplified.
   */
  set hours(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#hours = Math.trunc(value) % 24
    this.days += Math.trunc(value / 24)
  }

  /**
   * Gets the minutes.
   */
  get minutes(): number {
    return this.#minutes
  }

  /**
   * Sets the minutes.
   *
   * If the value is greater than or equal to 60 the duration is simplified.
   */
  set minutes(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#minutes = Math.trunc(value) % 60
    this.hours += Math.trunc(value / 60)
  }

  /**
   * Gets the seconds.
   */
  get seconds(): number {
    return this.#seconds
  }

  /**
   * Sets the seconds.
   *
   * If the value is greater than or equal to 60 the value is simplified.
   */
  set seconds(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#seconds = Math.trunc(value) % 60
    this.minutes += Math.trunc(value / 60)
  }

  /**
   * The number of milliseconds of the duration assuming a year has 360 days
   * and a month has 30 days.
   *
   * Note that this is not idempotent. As the actual number of days in a year
   * is not available, constant values are used. This means that 30 days is
   * equivalent to a month.
   *
   * ```js
   * const d1 = new Duration('P1M')
   * console.log(d1.valueOf())
   * // 2592000
   *
   * const d2 = new Duration('P30D')
   * console.log(d1.valueOf())
   * // 2592000
   * ```
   *
   * @returns The number of milliseconds to which the duration corresponds.
   */
  valueOf(): number {
    const totalDays =
      this.#years * 360 + this.#months * 30 + this.#weeks * 7 + this.#days
    const totalSeconds =
      this.#hours * 60 * 60 + this.#minutes * 60 + this.#seconds
    return totalDays * SECONDS_IN_DAY + totalSeconds
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
