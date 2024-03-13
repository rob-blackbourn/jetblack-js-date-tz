import {
  DateTz,
  IANATimezone,
  addYears,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addYears', () => {
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
      describe('basic', () => {
        it('should add years', () => {
          const date = new DateTz(2000, 0, 1, tz)
          const actual = addYears(date, 5)
          const expected = new DateTz(2005, 0, 1, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract years', () => {
          const date = new DateTz(2000, 0, 1, tz)
          const actual = addYears(date, -5)
          const expected = new DateTz(1995, 0, 1, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })
      })

      describe('edge cases', () => {
        it('should not years', () => {
          const date = new DateTz(2000, 0, 1, tz)
          const actual = addYears(date, 0)
          const expected = new DateTz(2000, 0, 1, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })
      })
    })
  }
})
