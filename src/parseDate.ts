import { DateTz } from './DateTz'
import { tzLocal } from './LocalTimezone'
import {
  I18nSettings,
  LocaleInfo,
  getLocaleInfo,
  NameStyle
} from './LocaleInfo'
import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'
import { daysInMonth } from './daysInMonth'

interface DateInfo {
  year: number
  monthIndex: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  isAfternoon: number
  timezoneOffset: number | null
}

interface ParseInfo {
  field: keyof DateInfo | null
  pattern: string
  parse?: (value: string, localeInfo: I18nSettings) => number | null
  requiredField?: keyof DateInfo
}

const literalRegex = /\[([^]*?)\]/gm
const tokenRegex =
  /d{1,4}|m{1,4}|yy(?:yy)?|S{1,3}|F{1,3}|D{2,4}|ZZ|Z|([HhMS])\1?|t|"[^"]*"|'[^']*'/g

const fourDigitsPattern = '\\d{4}'
const threeDigitsPattern = '\\d{3}'
const twoDigitsPattern = '\\d{2}'
const oneOrTwoDigitsPattern = '\\d{1,2}'
const wordPattern = '[^\\s]+'

const escapeRegexTokens = (text: string): string =>
  text.replace(/[|\\{()[^$+*?.-]/g, '\\$&')

function parseMonthName(
  name: string,
  style: NameStyle,
  localeInfo: I18nSettings
): number | null {
  const index = localeInfo.month[style].findIndex(
    x => x.localeCompare(name, localeInfo.locale, { sensitivity: 'base' }) == 0
  )
  return index === -1 ? null : index
}

function parseDecade(value: string): number {
  const decade = +value
  const currentYear = new Date().getFullYear()
  const currentCentury = currentYear - (currentYear % 100)
  const year = currentCentury + decade
  const yearsBetween = year - currentYear
  if (Math.abs(yearsBetween) <= 50) {
    return year
  } else if (yearsBetween > 0) {
    return year - 100
  } else {
    return year + 100
  }
}

const parseMonthIndex = (value: string): number => +value - 1

function parseDayPeriod(
  value: string,
  localeInfo: LocaleInfo,
  style: NameStyle
): number {
  const dayPeriods = localeInfo.dayPeriod[style]
  const [morning, afternoon] = dayPeriods

  if (
    value.localeCompare(morning, localeInfo.locale, {
      sensitivity: 'base'
    }) === 0
  ) {
    return -1
  } else if (
    value.localeCompare(afternoon, localeInfo.locale, {
      sensitivity: 'base'
    }) === 0
  ) {
    return 1
  } else {
    return 0
  }
}

const emptyWordParseInfo: ParseInfo = { field: null, pattern: wordPattern }

const timezoneOffsetParseInfo: ParseInfo = {
  field: 'timezoneOffset',
  pattern: '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?',
  parse: (value: string): number | null => {
    const parts = (value + '').match(/([+-]|\d\d)/gi)

    if (parts) {
      const minutes = +parts[1] * 60 + parseInt(parts[2], 10)
      return parts[0] === '+' ? minutes : -minutes
    }

    return 0
  }
}

const parseInfoMap: Record<string, ParseInfo> = {
  d: { field: 'day', pattern: oneOrTwoDigitsPattern },
  dd: { field: 'day', pattern: twoDigitsPattern },
  ddd: emptyWordParseInfo,
  dddd: emptyWordParseInfo,
  DD: {
    field: 'day',
    pattern: oneOrTwoDigitsPattern + wordPattern,
    parse: value => parseInt(value, 10)
  },
  DDD: emptyWordParseInfo,
  DDDD: emptyWordParseInfo,
  m: {
    field: 'monthIndex',
    pattern: oneOrTwoDigitsPattern,
    parse: parseMonthIndex
  },
  mm: {
    field: 'monthIndex',
    pattern: twoDigitsPattern,
    parse: parseMonthIndex
  },
  mmm: {
    field: 'monthIndex',
    pattern: wordPattern,
    parse: (value, localeInfo) => parseMonthName(value, 'short', localeInfo)
  },
  mmmm: {
    field: 'monthIndex',
    pattern: wordPattern,
    parse: (value, localeInfo) => parseMonthName(value, 'long', localeInfo)
  },
  yy: {
    field: 'year',
    pattern: twoDigitsPattern,
    parse: parseDecade
  },
  yyyy: { field: 'year', pattern: fourDigitsPattern },
  h: {
    field: 'hour',
    pattern: oneOrTwoDigitsPattern,
    requiredField: 'isAfternoon'
  },
  hh: {
    field: 'hour',
    pattern: twoDigitsPattern,
    requiredField: 'isAfternoon'
  },
  H: { field: 'hour', pattern: oneOrTwoDigitsPattern },
  HH: { field: 'hour', pattern: twoDigitsPattern },
  M: { field: 'minute', pattern: oneOrTwoDigitsPattern },
  MM: { field: 'minute', pattern: twoDigitsPattern },
  S: { field: 'second', pattern: oneOrTwoDigitsPattern },
  SS: { field: 'second', pattern: twoDigitsPattern },
  F: {
    field: 'millisecond',
    pattern: '\\d',
    parse: v => +v * 100
  },
  FF: { field: 'millisecond', pattern: twoDigitsPattern, parse: v => +v * 10 },
  FFF: { field: 'millisecond', pattern: threeDigitsPattern },
  t: {
    field: 'isAfternoon',
    pattern: wordPattern,
    parse: (value, localeInfo) => parseDayPeriod(value, localeInfo, 'narrow')
  },
  ZZ: timezoneOffsetParseInfo,
  Z: timezoneOffsetParseInfo
}

function isDateInfoValid(dateInfo: DateInfo): boolean {
  return (
    dateInfo.monthIndex >= 0 &&
    dateInfo.monthIndex < 12 &&
    dateInfo.day >= 1 &&
    dateInfo.day <= daysInMonth(dateInfo.year, dateInfo.monthIndex) &&
    dateInfo.hour >= 0 &&
    dateInfo.hour < 24 &&
    dateInfo.minute >= 0 &&
    dateInfo.minute < 60 &&
    dateInfo.second >= 0 &&
    dateInfo.second < 60 &&
    dateInfo.millisecond >= 0 &&
    dateInfo.millisecond < 1000
  )
}

function applyPattern(
  text: string,
  formatPattern: string,
  formatParseInfos: ParseInfo[],
  localeInfo: I18nSettings
): DateInfo | null {
  // Check if the date string matches the format. If it doesn't return null
  const matches = text.match(new RegExp(formatPattern, 'i'))
  if (!matches || matches[0] !== matches.input) {
    return null
  }

  // Default to the beginning of this year.
  const dateInfo: DateInfo = {
    year: new Date().getFullYear(),
    monthIndex: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isAfternoon: 0,
    timezoneOffset: null
  }

  // For each match, call the parser function for that date part
  for (let i = 1; i < matches.length; ++i) {
    const { field, parse: parser } = formatParseInfos[i - 1]
    const value = parser ? parser(matches[i], localeInfo) : +matches[i]

    // If the parser can't make sense of the value, return null
    if (value == null) {
      return null
    }

    if (field != null) {
      dateInfo[field] = value
    }
  }

  if (dateInfo.isAfternoon > 0 && dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12
  } else if (dateInfo.isAfternoon < 0 && dateInfo.hour === 12) {
    dateInfo.hour = 0
  }

  return dateInfo
}

function createDateParser(
  format: string
): (value: string, localeInfo: I18nSettings) => DateInfo | null {
  // Replace all the literals with @@@. Hopefully a string that won't exist in the format
  const literals: string[] = []
  let formatWithoutLiterals = format.replace(literalRegex, (_match, p1) => {
    literals.push(escapeRegexTokens(p1))
    return '@@@'
  })

  // Change every token that we find into the correct regex
  const formatParseInfos: ParseInfo[] = []
  const specifiedFields: { [field: string]: boolean } = {}
  const requiredFields: { [field: string]: boolean } = {}
  const formatPatternWithoutLiterals = escapeRegexTokens(
    formatWithoutLiterals
  ).replace(tokenRegex, match => {
    const parseInfo = parseInfoMap[match]

    // Check if the person has specified the same field twice. This will lead to confusing results.
    if (parseInfo.field != null && parseInfo.field in specifiedFields) {
      throw new Error(`Invalid format. Duplicate field "${parseInfo.field}"`)
    }

    if (parseInfo.field != null) {
      specifiedFields[parseInfo.field] = true
    }

    // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
    if (parseInfo.requiredField) {
      requiredFields[parseInfo.requiredField] = true
    }

    formatParseInfos.push(parseInfo)

    return '(' + parseInfo.pattern + ')'
  })

  for (const field in requiredFields) {
    if (!(field in specifiedFields)) {
      throw new Error(`Invalid format. Missing required field "${field}"`)
    }
  }

  // Add back the literals.
  const formatPattern = formatPatternWithoutLiterals.replace(
    /@@@/g,
    () => literals.shift() as string
  )

  return (value: string, localeInfo: I18nSettings) =>
    applyPattern(value, formatPattern, formatParseInfos, localeInfo)
}

/**
 * Parse a date string into a Javascript Date object.
 *
 * If the timezone offset is absent the dates will be according to the local
 * timezone.
 *
 * ```js
 * import { parseDate } from '@jetblack/date'
 *
 * const d = parseDate('12 March, 1998', 'dd mmm, yyyy')
 * ```
 *
 * ### Pattern items
 *
 * | Value | Description |
 * | ----- | ----------- |
 * | d       | Day of the month as digits; no leading zero for single-digit days. |
 * | dd      | Day of the month as digits; leading zero for single-digit days. |
 * | ddd     | Day of the week as a three-letter abbreviation. |
 * | dddd    | Day of the week as its full name. |
 * | DD      | Day of the month with the plural suffix. |
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
 * | Z       | Timezone offset. |
 * | [dhM]   | Literal characters. |
 *
 * @category Formatting
 *
 * @param text Date string
 * @param format Date parse format
 * @param tz An optional timezone. Defaults to the local timezone.
 * @param locale An optional locale. Defaults to the current locale.
 * @returns The date, or null if parsing failed.
 */
export function parseDate(
  text: string,
  format: string,
  tz: Timezone = tzLocal,
  locale: I18nSettings | string | undefined = undefined
): DateTz | null {
  const localeInfo = getLocaleInfo(locale)

  const dateParser = createDateParser(format)

  const dateInfo = dateParser(text, localeInfo)

  if (dateInfo == null || !isDateInfoValid(dateInfo)) {
    return null
  }

  if (dateInfo.timezoneOffset == null) {
    return new DateTz(
      dateInfo.year,
      dateInfo.monthIndex,
      dateInfo.day,
      dateInfo.hour,
      dateInfo.minute,
      dateInfo.second,
      dateInfo.millisecond,
      tz
    )
  } else {
    return new DateTz(
      dateInfo.year,
      dateInfo.monthIndex,
      dateInfo.day,
      dateInfo.hour,
      dateInfo.minute - dateInfo.timezoneOffset,
      dateInfo.second,
      dateInfo.millisecond,
      tzUtc
    ).as(tz)
  }
}
