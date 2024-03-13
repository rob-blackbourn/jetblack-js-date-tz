import { rangeGenerator } from './utils'

/**
 * Day plurals.
 *
 * The names from Intl.PluralRules.
 */
export interface DayPlurals {
  zero: string
  one: string
  two: string
  few: string
  many: string
  other: string
}

/**
 * Day periods: morning, afternoon.
 */
export type DayPeriods = [string, string]

/**
 * The Intl name style.
 */
export type NameStyle = 'narrow' | 'short' | 'long'

/**
 * The settings for internationalization.
 */
export interface I18nSettings {
  /** The locale name */
  locale: string
  /** The day period names */
  dayPeriod: Record<NameStyle, DayPeriods>
  /** The names of the days of the week */
  weekday: Record<NameStyle, Days>
  /** The names of the months */
  month: Record<NameStyle, Months>
  /** The plurals of the days of the month for 31 days starting at 0 */
  dayPlurals: string[]
}

/** The 7 days of the week */
export type Days = [string, string, string, string, string, string, string]

/** The 12 months of the year */
export type Months = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
]

function getLocaleName(
  index: number,
  type: 'weekday' | 'month',
  style: NameStyle,
  locale: string
): string {
  const monthIndex = type === 'month' ? index : 0
  const day = type === 'weekday' ? 1 + index : 1
  const date = new Date(1967, monthIndex, day)
  return date.toLocaleString(locale, { [type]: style })
}

function getLocaleNames(
  type: 'weekday' | 'month',
  style: NameStyle,
  locale: string
): string[] {
  return Array.from(
    type === 'weekday' ? rangeGenerator(0, 7) : rangeGenerator(0, 12)
  ).map(i => getLocaleName(i, type, style, locale))
}

const defaultNumberPlurals: DayPlurals = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'rd',
  other: 'th'
}

function getDayPlurals(
  locale: string,
  dayPlurals: DayPlurals = defaultNumberPlurals
): string[] {
  const ordinalRules = new Intl.PluralRules(locale, { type: 'ordinal' })
  function ordinal(number: number): string {
    const category = ordinalRules.select(number)
    const suffix = dayPlurals[category]
    return new String(number) + suffix
  }

  const plurals = new Array(31).fill('').map((_, index) => ordinal(index + 1))

  return plurals
}

/**
 * Get the day period using Intl.DateTimeFormat.
 *
 * Unfortunately this is largely broken. Most locales just return
 * "in the morning" and "in the afternoon" for all dayPeriod styles. Omitting
 * the "dayPeriod" option, returns variations of AM and PM, which is what is
 * done for 'narrow' and 'short'.
 *
 * @param locale The locale
 * @param style The style of text to fetch
 * @returns The day period
 */
function getDayPeriods(
  locale: string,
  style: 'narrow' | 'short' | 'long'
): DayPeriods {
  let options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: true
  }

  if (style === 'long') {
    options = {
      ...options,
      dayPeriod: style
    }
  }

  const morning = new Intl.DateTimeFormat(locale, options)
    .formatToParts(new Date(1970, 0, 1, 1))
    .filter(x => x.type === 'dayPeriod')
    .map(x => x.value)
  const afternoon = new Intl.DateTimeFormat(locale, options)
    .formatToParts(new Date(1970, 0, 1, 13))
    .filter(x => x.type === 'dayPeriod')
    .map(x => x.value)
  return [
    morning.length === 1 ? morning[0] : 'AM',
    afternoon.length === 1 ? afternoon[0] : 'PM'
  ]
}

/**
 * A class holding information for locales.
 *
 * The class attempts to load locale info from the browser.
 */
export class LocaleInfo implements I18nSettings {
  /** The locale */
  locale: string
  /** The day period names */
  dayPeriod: Record<NameStyle, DayPeriods>
  /** The weekday names */
  weekday: Record<NameStyle, Days>
  /** The month names */
  month: Record<NameStyle, Months>
  /** the plurals for days from one to thirty one */
  dayPlurals: string[]

  constructor(locale?: string, dayPlurals: DayPlurals = defaultNumberPlurals) {
    this.locale = locale || Intl.DateTimeFormat().resolvedOptions().locale
    this.dayPeriod = {
      narrow: getDayPeriods(this.locale, 'narrow'),
      short: getDayPeriods(this.locale, 'short'),
      long: getDayPeriods(this.locale, 'long')
    }
    this.weekday = {
      narrow: getLocaleNames('weekday', 'narrow', this.locale) as Days,
      short: getLocaleNames('weekday', 'short', this.locale) as Days,
      long: getLocaleNames('weekday', 'long', this.locale) as Days
    }
    this.month = {
      narrow: getLocaleNames('month', 'narrow', this.locale) as Months,
      short: getLocaleNames('month', 'short', this.locale) as Months,
      long: getLocaleNames('month', 'long', this.locale) as Months
    }
    this.dayPlurals = getDayPlurals(
      this.locale,
      dayPlurals || defaultNumberPlurals
    )
  }
}

const localeCache: { [locale: string]: I18nSettings } = {}

/**
 * Get the locale information.
 *
 * @param locale A populated LocalInfo
 * @returns
 */
export function getLocaleInfo(
  locale: I18nSettings | string | undefined
): I18nSettings {
  if (locale === undefined) {
    locale = 'default'
  }
  if (typeof locale === 'string') {
    if (!(locale in localeCache)) {
      localeCache[locale] = new LocaleInfo(locale)
    }
    locale = localeCache[locale]
  }
  return locale
}
