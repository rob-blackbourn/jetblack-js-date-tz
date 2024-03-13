import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc,
  weekOfYear
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('weekOfDate', () => {
  const tzChicago = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )
  const tzTokyo = new IANATimezone(
    'Asia/Tokyo',
    tokyoTzData.map(dataToTimezoneOffset)
  )

  for (const tz of [tzUtc, tzLocal, tzChicago, tzTokyo]) {
    describe(tz.name, () => {
      it('returns the local week of year for 2-Jan-2005', () => {
        const date = new DateTz(2005, 0, 2, tz)
        const result = weekOfYear(date)
        expect(result).toBe(1)
      })

      it('returns the week of year for 1-Jan-2006', () => {
        const date = new DateTz(2006, 0, 1, tz)
        const result = weekOfYear(date)
        expect(result).toBe(1)
      })

      it('returns the week of year for 31-Dec-2006', () => {
        const date = new DateTz(2006, 11, 31, tz)
        const result = weekOfYear(date)
        expect(result).toBe(53)
      })

      it('returns the week of year for 31-Dec-2015', () => {
        const date = new DateTz(2015, 11, 31, tz)
        const result = weekOfYear(date)
        expect(result).toBe(53)
      })
    })
  }
})
