import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  dateRangeByYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateRangeByYear', () => {
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
      it('should create a year range', () => {
        const actual = dateRangeByYear(
          new DateTz(2000, 0, 1, tz),
          new DateTz(2005, 0, 1, tz),
          1
        )
        const expected = [
          new DateTz(2000, 0, 1, tz),
          new DateTz(2001, 0, 1, tz),
          new DateTz(2002, 0, 1, tz),
          new DateTz(2003, 0, 1, tz),
          new DateTz(2004, 0, 1, tz),
          new DateTz(2005, 0, 1, tz)
        ]
        actual.forEach((value, index) =>
          expect(value.toISOString()).toBe(expected[index].toISOString())
        )
      })
    })
  }
})
