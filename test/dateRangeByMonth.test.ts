import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  dateRangeByMonth,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateRangeByMonth', () => {
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
      it('should create a month range', () => {
        const actual = dateRangeByMonth(
          new DateTz(2000, 0, 1, tz),
          new DateTz(2000, 5, 1, tz),
          1
        )
        const expected = [
          new DateTz(2000, 0, 1, tz),
          new DateTz(2000, 1, 1, tz),
          new DateTz(2000, 2, 1, tz),
          new DateTz(2000, 3, 1, tz),
          new DateTz(2000, 4, 1, tz),
          new DateTz(2000, 5, 1, tz)
        ]
        actual.forEach((value, index) =>
          expect(value.toISOString()).toBe(expected[index].toISOString())
        )
      })
    })
  }
})
