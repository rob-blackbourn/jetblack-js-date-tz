import { DateTz } from './DateTz'

const leapSecondDates: number[] = [
  63072000000, // 1 Jan 1972
  78796800000, // 1 Jul 1972
  94694400000, // 1 Jan 1973
  126230400000, // 1 Jan 1974
  157766400000, // 1 Jan 1975
  189302400000, // 1 Jan 1976
  220924800000, // 1 Jan 1977
  252460800000, // 1 Jan 1978
  283996800000, // 1 Jan 1979
  315532800000, // 1 Jan 1980
  362793600000, // 1 Jul 1981
  394329600000, // 1 Jul 1982
  425865600000, // 1 Jul 1983
  489024000000, // 1 Jul 1985
  567993600000, // 1 Jan 1988
  631152000000, // 1 Jan 1990
  662688000000, // 1 Jan 1991
  709948800000, // 1 Jul 1992
  741484800000, // 1 Jul 1993
  773020800000, // 1 Jul 1994
  820454400000, // 1 Jan 1996
  867715200000, // 1 Jul 1997
  915148800000, // 1 Jan 1999
  1136073600000, // 1 Jan 2006
  1230768000000, // 1 Jan 2009
  1341100800000, // 1 Jul 2012
  1435708800000, // 1 Jul 2015
  1483228800000 // 1 Jan 2017
]

/**
 * Find the number of leap seconds between the dates (inclusive).
 *
 * ```js
 * import { DateTz, endOfYear, leapSeconds, tzUtc } from '@jetblack/date-tz'
 *
 * const d1 = new DateTz(1972, 1, 1, tzUtc)
 * const d2 = endOfYear(d1)
 * // There were two leap seconds in 1972
 * console.log(leapSeconds(d1, d2) == 2)
 *
 * const d3 = new DateTz(2000, 1, 1, tzUtc)
 * const d4 = endOfYear(new DateTz(2005, 1, 1, tzUtc))
 * // There were no leap seconds in between 2000 and 2005
 * console.log(leapSeconds(d3, d4) == 0)
 * ```
 *
 * @param firstDate The first date.
 * @param secondDate The second date.
 * @returns The number of leap seconds
 */
export function leapSeconds(firstDate: DateTz, secondDate: DateTz): number {
  const firstTime = firstDate.getTime()
  const secondTime = secondDate.getTime()
  const secondBigger = secondTime > firstTime
  const startTime = secondBigger ? firstTime : secondTime
  const endTime = secondBigger ? secondTime : firstTime
  return leapSecondDates.filter(x => x >= startTime && x <= endTime).length
}
