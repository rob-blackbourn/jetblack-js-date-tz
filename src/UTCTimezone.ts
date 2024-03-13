import { Timezone } from './Timezone'
import { DatePartResponse } from './types'

class UtcTimezone extends Timezone {
  constructor() {
    super('UTC')
  }

  makeDate(
    year: number,
    monthIndex: number,
    day: number = 1,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0
  ): Date {
    return new Date(
      Date.UTC(year, monthIndex, day, hours, minutes, seconds, milliseconds)
    )
  }

  dateParts(date: Date): DatePartResponse {
    return {
      year: date.getUTCFullYear(),
      monthIndex: date.getUTCMonth(),
      weekday: date.getUTCDay(),
      day: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
      milliseconds: date.getUTCMilliseconds()
    }
  }

  offset(date: Date): number {
    return 0
  }

  toISOString(date: Date): string {
    return date.toISOString()
  }

  year(date: Date): number {
    return date.getUTCFullYear()
  }

  monthIndex(date: Date): number {
    return date.getUTCMonth()
  }

  weekday(date: Date): number {
    return date.getUTCDay()
  }

  day(date: Date): number {
    return date.getUTCDate()
  }

  hours(date: Date): number {
    return date.getUTCHours()
  }

  minutes(date: Date): number {
    return date.getUTCMinutes()
  }

  seconds(date: Date): number {
    return date.getUTCSeconds()
  }

  milliseconds(date: Date): number {
    return date.getUTCMilliseconds()
  }

  isDaylightSavings(date: Date): boolean {
    return false
  }
}

/**
 * The timezone for UTC.
 *
 * @category Timezone
 */
export const tzUtc = new UtcTimezone()
