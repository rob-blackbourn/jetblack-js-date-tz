import { startOfDay } from './startOfDay'
import { addDays } from './addDays'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by week.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The week step count.
 * @returns The range of dates separated by step weeks from the start to the end date.
 */
export function dateRangeByWeek(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfDay(endDate).getTime()
  let date = startOfDay(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addDays(date, step * 7)
  }
  return dates
}
