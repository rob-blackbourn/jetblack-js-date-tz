import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Calculates Easter in the Gregorian calendar.
 *
 * @category Calendars
 *
 * @param year The year.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The date for easter in the given year.
 */
export function easter(year: number, tz: Timezone = tzLocal): DateTz {
  const G = year % 19,
    C = Math.floor(year / 100),
    H =
      (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) %
      30,
    I =
      H -
      Math.floor(H / 28) *
        (1 - Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11)),
    J = (year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)) % 7,
    L = I - J,
    month = 3 + Math.floor((L + 40) / 44),
    day = L + 28 - 31 * Math.floor(month / 4)

  return new DateTz(year, month - 1, day, tz)
}
