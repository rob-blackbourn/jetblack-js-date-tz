import { startOfWeek } from './startOfWeek'
import { DateTz } from './DateTz'

/**
 * Find the week year for a given date.
 *
 * @category Miscellaneous
 *
 * @param dateTz The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week year.
 */
export function weekYear(dateTz: DateTz): number {
  const year = dateTz.year
  const startOfNextYear = startOfWeek(new DateTz(year + 1, 0, 1, dateTz.tz))
  const startOfThisYear = startOfWeek(new DateTz(year, 0, 1, dateTz.tz))

  if (dateTz.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (dateTz.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}
