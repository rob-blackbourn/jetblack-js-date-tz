import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  findWeekdayIndex,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('indices', () => {
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
      it('should find weekday', () => {
        const actual = findWeekdayIndex(
          [
            new DateTz(2000, 0, 1, tz),
            new DateTz(2000, 0, 2, tz),
            new DateTz(2000, 0, 3, tz),
            new DateTz(2000, 0, 4, tz),
            new DateTz(2000, 0, 5, tz),
            new DateTz(2000, 0, 6, tz),
            new DateTz(2000, 0, 7, tz),
            new DateTz(2000, 0, 8, tz),
            new DateTz(2000, 0, 9, tz),
            new DateTz(2000, 0, 10, tz),
            new DateTz(2000, 0, 11, tz),
            new DateTz(2000, 0, 12, tz),
            new DateTz(2000, 0, 13, tz),
            new DateTz(2000, 0, 14, tz)
          ],
          1 //Monday
        )
        expect(actual).toBe(2)
      })

      it('should not find weekday', () => {
        const actual = findWeekdayIndex(
          [new DateTz(2000, 0, 1, tz), new DateTz(2000, 0, 2, tz)],
          1 //Monday
        )
        expect(actual).toBe(-1)
      })
    })
  }
})
