import { addMinutes } from './addMinutes'
import { startOfMinute } from './startOfMinute'
import { DateTz } from './DateTz'

/**
 * Creates a range of dates by minutes.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The minute step count.
 * @returns The range of dates separated by step hours from the start to the end minute.
 */
export function dateRangeByMinute(
  startDate: DateTz,
  endDate: DateTz,
  step: number = 1
): DateTz[] {
  const endTime = startOfMinute(endDate).getTime()
  let date = startOfMinute(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addMinutes(date, step)
  }
  return dates
}
