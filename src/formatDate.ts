import { isoWeekOfYear } from './isoWeekOfYear'
import { tzLocal } from './LocalTimezone'
import { I18nSettings, getLocaleInfo } from './LocaleInfo'
import { Timezone } from './Timezone'
import { DateTz } from './DateTz'

/** @internal  */
const token =
  /d{1,4}|D{2,3}|m{1,4}|yy(?:yy)?|([HhMSt])\1?|F{1,3}|W{1,2}|[opZN]|"[^"]*"|'[^']*'|\[([^]*?)\]/g

/** @internal */
const getDayOfWeek = (dateTz: DateTz): number => {
  let dow = dateTz.weekday
  return dow === 0 ? 7 : dow
}

const flags: Record<string, (dateTz: DateTz, localeInfo: I18nSettings) => any> =
  {
    d: dateTz => dateTz.day,
    dd: dateTz => String(dateTz.day).padStart(2, '0'),
    ddd: (dateTz, localeInfo) => localeInfo.weekday.short[dateTz.weekday],
    dddd: (dateTz, localeInfo) => localeInfo.weekday.long[dateTz.weekday],
    DD: (dateTz, localeInfo) => localeInfo.dayPlurals[dateTz.day - 1],
    DDD: (dateTz, localeInfo) => localeInfo.weekday.narrow[dateTz.weekday],
    m: dateTz => dateTz.month,
    mm: dateTz => String(dateTz.month).padStart(2, '0'),
    mmm: (dateTz, localeInfo) => localeInfo.month.short[dateTz.month - 1],
    mmmm: (dateTz, localeInfo) => localeInfo.month.long[dateTz.month - 1],
    yy: dateTz => String(dateTz.year).slice(2),
    yyyy: dateTz => String(dateTz.year).padStart(4, '0'),
    h: dateTz => dateTz.hours % 12 || 12,
    hh: dateTz => String(dateTz.hours % 12 || 12).padStart(2, '0'),
    H: dateTz => dateTz.hours,
    HH: dateTz => String(dateTz.hours).padStart(2, '0'),
    M: dateTz => dateTz.minutes,
    MM: dateTz => String(dateTz.minutes).padStart(2, '0'),
    S: dateTz => dateTz.seconds,
    SS: dateTz => String(dateTz.seconds).padStart(2, '0'),
    F: dateTz => String(Math.floor(dateTz.milliseconds / 100)),
    FF: dateTz => String(Math.floor(dateTz.milliseconds / 10)).padStart(2, '0'),
    FFF: dateTz => String(dateTz.milliseconds).padStart(3, '0'),
    t: (dateTz, localeInfo) =>
      localeInfo.dayPeriod.narrow[dateTz.hours < 12 ? 0 : 1],
    tt: (dateTz, localeInfo) =>
      localeInfo.dayPeriod.short[dateTz.hours < 12 ? 0 : 1],
    ttt: (dateTz, localeInfo) =>
      localeInfo.dayPeriod.long[dateTz.hours < 12 ? 0 : 1],
    Z: dateTz => dateTz.tz.name,
    o: dateTz =>
      (dateTz.offset > 0 ? '-' : '+') +
      String(
        Math.floor(Math.abs(dateTz.offset) / 60) * 100 +
          (Math.abs(dateTz.offset) % 60)
      ).padStart(4, '0'),
    p: dateTz =>
      (dateTz.offset > 0 ? '-' : '+') +
      String(Math.floor(Math.abs(dateTz.offset) / 60)).padStart(2, '0') +
      ':' +
      String(Math.floor(Math.abs(dateTz.offset) % 60)).padStart(2, '0'),
    W: dateTz => isoWeekOfYear(dateTz),
    WW: dateTz => String(isoWeekOfYear(dateTz)).padStart(2, '0'),
    N: dateTz => getDayOfWeek(dateTz)
  }

/**
 * Format a date with a pattern.
 *
 * ```js
 * import { formatDate } from '@jetblack/date'
 *
 * const d = new Date("2000-01-01")
 * const s = formatDate(d, "d-mmm-yy")
 * console.log(s)
 * > 1-Jan-00
 * ```
 *
 * ### Pattern items
 *
 * | Value   | Description |
 * | ------- | ----------- |
 * | d       | Day of the month as digits; no leading zero for single-digit days. |
 * | dd      | Day of the month as digits; leading zero for single-digit days. |
 * | ddd     | Day of the week as the short representation (for en a three-letter abbreviation). |
 * | dddd    | Day of the week as its full name. |
 * | DD      | Day of the month with the plural suffix. |
 * | DDD     | Day of the week as the narrow representation. |
 * | m       | Month as digits; no leading zero for single-digit months. |
 * | mm      | Month as digits; leading zero for single-digit months. |
 * | mmm     | Month as a three-letter abbreviation. |
 * | mmmm    | Month as its full name. |
 * | yy      | Year as last two digits; leading zero for years less than 10. |
 * | yyyy    | Year represented by four digits. |
 * | h       | Hours; no leading zero for single-digit hours (12-hour clock). |
 * | hh      | Hours; leading zero for single-digit hours (12-hour clock). |
 * | H       | Hours; no leading zero for single-digit hours (24-hour clock). |
 * | HH      | Hours; leading zero for single-digit hours (24-hour clock). |
 * | M       | Minutes; no leading zero for single-digit minutes. |
 * | MM      | Minutes; leading zero for single-digit minutes. |
 * | S       | Seconds; no leading zero for single-digit seconds. |
 * | SS      | Seconds; leading zero for single-digit seconds. |
 * | F       | Hundreds of milliseconds. |
 * | FF      | Tens of milliseconds with a leading zero for single-digit values. |
 * | FFF     | Milliseconds: zero padded. |
 * | t       | Narrow dayPeriod from locale. |
 * | tt      | Short dayPeriod from locale. |
 * | ttt     | Long dayPeriod from locale. |
 * | Z       | Timezone name. |
 * | o       | GMT/UTC timezone offset, e.g. -0500 or +0230. |
 * | '...' or "..." | Literal character sequence. Surrounding quotes are removed. |
 *
 * @category Formatting
 *
 * @param dateTz A date.
 * @param pattern The format pattern.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @param locale An optional locale. Defaults to the current browser locale.
 * @returns The formatted date string.
 */
export function formatDate(
  dateTz: DateTz,
  pattern: string = "yyyy-mm-dd'T'HH:MM:SSo",
  locale: I18nSettings | string | undefined = undefined
) {
  const localeInfo = getLocaleInfo(locale)

  return pattern.replace(token, match => {
    if (match in flags) {
      return flags[match](dateTz, localeInfo)
    }
    return match.slice(1, match.length - 1)
  })
}

/**
 * @deprecated Use {@link formatDate} instead.
 */
export const dateFormat = formatDate
