import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  roundDate,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('roundDate', () => {
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
      it('should round down', () => {
        const date = new DateTz(2020, 0, 1, 11, 59, 59, 999, tz)
        const actual = roundDate(date)
        const expected = new DateTz(2020, 0, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should round up', () => {
        const date = new DateTz(2020, 0, 1, 12, 0, 0, 0, tz)
        const actual = roundDate(date)
        const expected = new DateTz(2020, 0, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should not change', () => {
        const date = new DateTz(2020, 0, 1, 0, 0, 0, 0, tz)
        const actual = roundDate(date)
        const expected = new DateTz(2020, 0, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
