import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  quarterOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('quarterOfYear', () => {
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
      it('should find quarter', () => {
        expect(quarterOfYear(new DateTz(2000, 0, 1, tz))).toBe(1)
        expect(quarterOfYear(new DateTz(2000, 1, 1, tz))).toBe(1)
        expect(quarterOfYear(new DateTz(2000, 2, 1, tz))).toBe(1)
        expect(quarterOfYear(new DateTz(2000, 3, 1, tz))).toBe(2)
        expect(quarterOfYear(new DateTz(2000, 4, 1, tz))).toBe(2)
        expect(quarterOfYear(new DateTz(2000, 5, 1, tz))).toBe(2)
        expect(quarterOfYear(new DateTz(2000, 6, 1, tz))).toBe(3)
        expect(quarterOfYear(new DateTz(2000, 7, 1, tz))).toBe(3)
        expect(quarterOfYear(new DateTz(2000, 8, 1, tz))).toBe(3)
        expect(quarterOfYear(new DateTz(2000, 9, 1, tz))).toBe(4)
        expect(quarterOfYear(new DateTz(2000, 10, 1, tz))).toBe(4)
        expect(quarterOfYear(new DateTz(2000, 11, 1, tz))).toBe(4)
      })
    })
  }
})
