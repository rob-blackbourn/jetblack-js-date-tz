import { getClosestValues } from './utils'
import { OffsetTimezone } from './OffsetTimezone'

/**
 * A line from the tzdata database.
 *
 * @category Timezone
 */
export interface TimezoneOffset {
  /**
   * The from which this offset applies in milliseconds since 1 Jan 1970 UTC.
   */
  utc: number
  /**
   * The offset to be added to local time in minutes.
   */
  offset: number
  /**
   * The common timezone abbreviation.
   */
  abbr: string
  /**
   * If true the adjustment includes daylight savings time.
   */
  isDst: boolean
}

/**
 * An implementation for time zones using IANA data.
 *
 * This example gets the data from the internet.
 *
 * ```js
 * import { IANATimezone, minDataToTimezoneOffset } from '@jetblack/date-tz'
 *
 * const timezoneName = 'Europe/Brussels'
 * fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.min.json`)
 *  .then(response => response.json())
 *  .then(data => {
 *    const zoneData = data.map(minDataToTimezoneOffset)
 *    const tz = new IANATimezone(timeZoneName, zoneData)
 *    const newYearsDay = tz.makeDate(2000, 0, 1)
 *    // returns "2000-01-01T01:00:00Z"
 *  })
 *  .catch(error => console.error(error))
 * }
 * ```
 *
 * @category Timezone
 */
export class IANATimezone extends OffsetTimezone {
  /** @ignore */
  #deltas: TimezoneOffset[]

  /**
   * Construct a custom timezone.
   *
   * @param name The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string, deltas: TimezoneOffset[]) {
    super(name)
    this.#deltas = deltas
  }

  /** @ignore */
  private findOffset(date: Date): TimezoneOffset {
    const [lo, hi] = getClosestValues(
      this.#deltas,
      date.getTime(),
      (a, b) => b.utc - a
    )
    if (lo >= hi) {
      return lo
    }

    // If the date is outside the range, return the closest.
    if (
      Math.abs(lo.utc.valueOf() - date.valueOf()) <
      Math.abs(hi.utc.valueOf() - date.valueOf())
    ) {
      return lo
    } else {
      return hi
    }
  }

  offset(date: Date): number {
    const delta = this.findOffset(date)
    return delta.offset
  }

  isDaylightSavings(date: Date): boolean {
    const delta = this.findOffset(date)
    return delta.isDst
  }
}
