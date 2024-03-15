import { startOfDay } from './startOfDay'
import { addQuarters } from './addQuarters'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by quarters.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The quarter step count. Defaults to 1.
 * @returns The range of dates separated by step months from the start to the end date.
 */
export function dateRangeByQuarter(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfDay(endDate).getTime()
  let date = startOfDay(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addQuarters(date, step)
  }
  return dates
}
