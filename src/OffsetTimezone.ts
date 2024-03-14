import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'
import { MILLISECONDS_IN_MINUTE } from './constants'
import { DatePartResponse } from './types'

export abstract class OffsetTimezone extends Timezone {
  /**
   * Construct an offset timezone.
   *
   * @param name The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string) {
    super(name)
  }

  /** @ignore */
  protected fromLocal(localDate: Date): Date {
    const utcDate = new Date(
      localDate.getTime() - this.offset(localDate) * MILLISECONDS_IN_MINUTE
    )
    return utcDate
  }

  /** @ignore */
  protected toLocal(utcDate: Date): Date {
    const localDate = new Date(
      utcDate.getTime() + this.offset(utcDate) * MILLISECONDS_IN_MINUTE
    )
    return localDate
  }

  makeDate(
    year: number,
    month: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date {
    const date = tzUtc.makeDate(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    )
    return this.fromLocal(date)
  }

  dateParts(date: Date): DatePartResponse {
    const local = this.toLocal(date)
    return tzUtc.dateParts(local)
  }

  year(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.year(local)
  }

  month(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.month(local)
  }

  weekday(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.weekday(local)
  }

  day(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.day(local)
  }

  hours(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.hours(local)
  }

  minutes(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.minutes(local)
  }

  seconds(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.seconds(local)
  }

  milliseconds(date: Date): number {
    const local = this.toLocal(date)
    return tzUtc.milliseconds(local)
  }
}
