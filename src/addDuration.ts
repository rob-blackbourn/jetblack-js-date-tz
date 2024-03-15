import { DateTz } from './DateTz'
import { Duration } from './Duration'

/**
 * Add a duration to a date.
 *
 * ```js
 * import { DateTz, Duration, tzLocal } from '@jetblack/date-tz'
 *
 * const duration = new Duration('P1DT3H')
 * const date = addDuration(new DateTz(2000, 0, 1, tzLocal), duration)
 * ```
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param duration The duration to add.
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
