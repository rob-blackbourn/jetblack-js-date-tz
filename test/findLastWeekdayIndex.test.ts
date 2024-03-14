import {
  IANATimezone,
  dataToTimezoneOffset,
  findWeekdayIndex,
  findLastWeekdayIndex,
  tzLocal,
  tzUtc,
  DateTz
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
      describe('weekday', () => {
        it('should find weekday', () => {
          const actual = findWeekdayIndex(
            [
              new DateTz(2000, 1, 1, tz),
              new DateTz(2000, 1, 2, tz),
              new DateTz(2000, 1, 3, tz),
              new DateTz(2000, 1, 4, tz),
              new DateTz(2000, 1, 5, tz),
              new DateTz(2000, 1, 6, tz),
              new DateTz(2000, 1, 7, tz),
              new DateTz(2000, 1, 8, tz),
              new DateTz(2000, 1, 9, tz),
              new DateTz(2000, 1, 10, tz),
              new DateTz(2000, 1, 11, tz),
              new DateTz(2000, 1, 12, tz),
              new DateTz(2000, 1, 13, tz),
              new DateTz(2000, 1, 14, tz)
            ],
            1 //Monday
          )
          expect(actual).toBe(2)
        })

        it('should find last weekday', () => {
          const actual = findLastWeekdayIndex(
            [
              new DateTz(2000, 1, 1, tz),
              new DateTz(2000, 1, 2, tz),
              new DateTz(2000, 1, 3, tz),
              new DateTz(2000, 1, 4, tz),
              new DateTz(2000, 1, 5, tz),
              new DateTz(2000, 1, 6, tz),
              new DateTz(2000, 1, 7, tz),
              new DateTz(2000, 1, 8, tz),
              new DateTz(2000, 1, 9, tz),
              new DateTz(2000, 1, 10, tz),
              new DateTz(2000, 1, 11, tz),
              new DateTz(2000, 1, 12, tz),
              new DateTz(2000, 1, 13, tz),
              new DateTz(2000, 1, 14, tz)
            ],
            1 //Monday
          )
          expect(actual).toBe(9)
        })

        it('should not find weekday', () => {
          const actual = findWeekdayIndex(
            [new DateTz(2000, 1, 1, tz), new DateTz(2000, 0, 2, tz)],
            1 //Monday
          )
          expect(actual).toBe(-1)
        })

        it('should not find last weekday', () => {
          const actual = findLastWeekdayIndex(
            [
              new DateTz(2000, 1, 11, tz),
              new DateTz(2000, 1, 12, tz),
              new DateTz(2000, 1, 13, tz),
              new DateTz(2000, 1, 14, tz)
            ],
            1 //Monday
          )
          expect(actual).toBe(-1)
        })
      })
    })
  }
})
