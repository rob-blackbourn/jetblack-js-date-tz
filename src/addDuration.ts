import { DateTz } from './DateTz'
import { Duration } from './Duration'

/**
 * Add a duration to a date.
 *
 * ```js
 * import { Duration, tzLocal } from '@jetblack/date'
 *
 * const duration = new Duration('P1DT3H')
 * const date = addDuration(tzLocal.makeDate(2000, 0, 1), duration, tzLocal)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param duration The duration to add.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by adding the duration.
 */
export function addDuration(dateTz: DateTz, duration: Duration): DateTz {
  const { year, month, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year + duration.years,
    month + duration.months,
    day + (duration.days + duration.weeks * 7),
    hours + duration.hours,
    minutes + duration.minutes,
    seconds + duration.seconds,
    milliseconds,
    dateTz.tz
  )
}
