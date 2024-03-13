import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  startOfISOWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfISOWeek', () => {
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
      it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
        const date = new DateTz(2014, 8, 2, 2, 11, 55, tz)
        const actual = startOfISOWeek(date)
        const expected = new DateTz(2014, 8, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('for Jan 2 2005', () => {
        const date = new DateTz(2005, 0, 2, tz)
        const actual = startOfISOWeek(date)
        const expected = new DateTz(2004, 11, 27, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should handle Winter', () => {
        const date = new DateTz(2000, 0, 1, tz)
        const actual = startOfISOWeek(date)
        const expected = new DateTz(1999, 11, 27, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should handle summer', () => {
        const date = new DateTz(2000, 6, 1, tz)
        const actual = startOfISOWeek(date)
        const expected = new DateTz(2000, 5, 26, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
