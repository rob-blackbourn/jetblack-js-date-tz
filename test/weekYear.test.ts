import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc,
  weekYear
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('weekYear', () => {
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
      it('returns the local week-numbering year of the given date', () => {
        const date = new DateTz(2004, 12, 26, tz)
        const result = weekYear(date)
        expect(result).toBe(2005)
      })
    })
  }
})
