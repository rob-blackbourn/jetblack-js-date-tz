import { startOfHour } from './startOfHour'
import { addHours } from './addHours'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by hours.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The hour step count.
 * @returns The range of dates separated by step hours from the start to the end hour.
 */
export function dateRangeByHour(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfHour(endDate).getTime()
  let date = startOfHour(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addHours(date, step)
  }
  return dates
}
