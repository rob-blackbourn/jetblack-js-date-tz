import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  lastDayOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('lastDayOfYear', () => {
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
      it('should find the last moment of the year', () => {
        const date = new DateTz(2000, 0, 1, tz)
        const actual = lastDayOfYear(date)
        const expected = new DateTz(2000, 11, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
