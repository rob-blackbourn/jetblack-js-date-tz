import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  startOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfYear', () => {
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
      it('should return the start of the month', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, 664, tz)
        const actual = startOfYear(date)
        const expected = new DateTz(2014, 1, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should not change date', () => {
        const date = new DateTz(2014, 1, 1, tz)
        const actual = startOfYear(date)
        const expected = new DateTz(2014, 1, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
