import { addSeconds } from './addSeconds'
import { startOfSecond } from './startOfSecond'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by seconds.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The second step count.
 * @returns The range of dates separated by step hours from the start to the end second.
 */
export function dateRangeBySecond(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfSecond(endDate).getTime()
  let date = startOfSecond(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addSeconds(date, step)
  }
  return dates
}
