import { DateTz } from './DateTz'

/**
 * Add quarters to a date (or subtract if negative).
 *
 * The day of the quarter is kept constant if possible. Where the destination
 * has less days at the end of the month, the surplus days are added.
 *
 * @category Arithmetic
 *
 * @param dateTz The start date.
 * @param numberOfQuarters The number of quarters to add (or subtract if negative)
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of quarters.
 */
export function addQuarters(dateTz: DateTz, numberOfQuarters: number): DateTz {
  const { year, month, day, hours, minutes, seconds, milliseconds } =
    dateTz.parts

  return new DateTz(
    year,
    month + numberOfQuarters * 3,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
    dateTz.tz
  )
}
