import { startOfDay } from './startOfDay'
import { addYears } from './addYears'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by year.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The year step count.
 * @returns The range of dates separated by step years from the start to the end date.
 */
export function dateRangeByYear(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfDay(endDate).getTime()
  let date = startOfDay(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addYears(date, step)
  }
  return dates
}
