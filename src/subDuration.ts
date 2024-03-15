import { DateTz } from './DateTz'
import { Duration } from './Duration'

/**
 * Subtract a duration from a date.
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param duration The duration to subtract.
 * @returns A new date adjusted by subtracting the duration.
 */
export function subDuration(dateTz: DateTz, duration: Duration): DateTz {
  const { year, month, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year - duration.years,
    month - duration.months,
    day - (duration.days + duration.weeks * 7),
    hours - duration.hours,
    minutes - duration.minutes,
    seconds - duration.seconds,
    milliseconds,
    dateTz.tz
  )
}
