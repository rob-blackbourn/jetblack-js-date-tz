import { addMonths } from './addMonths'
import { startOfDay } from './startOfDay'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by month.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The month step count.
 * @returns The range of dates separated by step months from the start to the end date.
 */
export function dateRangeByMonth(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfDay(endDate).getTime()
  let date = startOfDay(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addMonths(date, step)
  }
  return dates
}
