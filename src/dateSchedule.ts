import { dateScheduleByDay } from './dateScheduleByDay'
import { dateScheduleByWeek } from './dateScheduleByWeek'
import { dateScheduleByMonth } from './dateScheduleByMonth'
import { dateScheduleByQuarter } from './dateScheduleByQuarter'
import { dateScheduleByYear } from './dateScheduleByYear'
import { DateTz } from './DateTz'

export type Periodicity =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'

/**
 * Creates a schedule of dates for a periodicity.
 *
 * @category Ranges
 *
 * @param periodicity The periodicity.
 * @param dateTz The start date.
 * @param start Start offset periods.
 * @param stop The number of periods.
 * @param step The period step count.
 * @returns The schedule of dates.
 */
export function dateSchedule(
  periodicity: Periodicity,
  dateTz: DateTz,
  start: number,
  stop: number,
  step: number = 1
): DateTz[] {
  if (periodicity === 'daily') {
    return dateScheduleByDay(dateTz, start, stop, step)
  } else if (periodicity == 'weekly') {
    return dateScheduleByWeek(dateTz, start, stop, step)
  } else if (periodicity === 'monthly') {
    return dateScheduleByMonth(dateTz, start, stop, step)
  } else if (periodicity === 'quarterly') {
    return dateScheduleByQuarter(dateTz, start, stop, step)
  } else if (periodicity === 'yearly') {
    return dateScheduleByYear(dateTz, start, stop, step)
  } else {
    throw new RangeError('invalid periodicity')
  }
}
