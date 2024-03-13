import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  startOfDay,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfDay', () => {
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
      it('should return the start of the day', () => {
        const date = new DateTz(2014, 8, 2, 2, 11, 55, 664, tz)
        const actual = startOfDay(date)
        const expected = new DateTz(2014, 8, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should not change date', () => {
        const date = new DateTz(2014, 8, 2, tz)
        const actual = startOfDay(date)
        const expected = new DateTz(2014, 8, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should handle dates outside those in the database', () => {
        const date = new DateTz(1900, 0, 1, 12, 0, 0, tz)
        const actual = startOfDay(date)
        const expected = new DateTz(1900, 0, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
