import { OffsetTimezone } from './OffsetTimezone'

const localeUS = 'en-US'
const datePatternUS = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/
const utcDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  hourCycle: 'h23',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}
const formatDateUTC = new Intl.DateTimeFormat(
  localeUS,
  utcDateTimeFormatOptions
)

interface DateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

function parseDate(dateText: string): DateParts {
  dateText = dateText.replace(/[\u200E\u200F]/g, '')
  const matches = datePatternUS.exec(dateText)
  if (matches == null) {
    throw new Error('Failed to parse date')
  }
  const [month, day, year, hour, minute] = matches
    .slice(1, 6)
    .map(x => parseInt(x))
  return { month, day, year, hour, minute }
}

function diffMinutes(d1: DateParts, d2: DateParts): number {
  var day = d1.day - d2.day
  var hour = d1.hour - d2.hour
  var min = d1.minute - d2.minute

  if (day > 15) day = -1
  if (day < -15) day = 1

  return 60 * (24 * day + hour) + min
}

/**
 * An implementation for time zones using Intl.DateTimeFormat.
 *
 * ```js
 * import { IntlTimezone } from '@jetblack/date-tz'
 *
 * const tz = new IntlTimezone('Europe/Brussels')
 * const newYearsDay = tz.makeDate(2000, 0, 1)
 * // returns "2000-01-01T01:00:00Z"
 * ```
 *
 * @category Timezone
 */
export class IntlTimezone extends OffsetTimezone {
  private formatDateTz: Intl.DateTimeFormat

  /**
   * Construct a timezone which uses the browser Intl.DateTimeFormat
   * to discover timezone offsets.
   *
   * @param timeZone The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string) {
    super(name)

    this.formatDateTz = new Intl.DateTimeFormat(localeUS, {
      ...utcDateTimeFormatOptions,
      timeZone: name
    })
  }

  offset(date: Date): number {
    return diffMinutes(
      parseDate(this.formatDateTz.format(date)),
      parseDate(formatDateUTC.format(date))
    )
  }

  isDaylightSavings(date: Date): boolean {
    const year = this.year(date)
    const currentOffset = this.offset(date)
    const jan1Offset = this.offset(this.makeDate(year, 0, 1))
    const jul1Offset = this.offset(this.makeDate(year, 6, 1))
    if (jan1Offset < jul1Offset) {
      // Northern hemisphere
      return currentOffset === jul1Offset
    } else if (jan1Offset > jul1Offset) {
      // Southern hemisphere
      return currentOffset === jan1Offset
    } else {
      return false
    }
  }
}
