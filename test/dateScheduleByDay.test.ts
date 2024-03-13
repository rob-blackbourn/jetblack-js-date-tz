import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  dateScheduleByDay,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateScheduleByDay', () => {
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
      it('should create a day range', () => {
        const actual = dateScheduleByDay(new DateTz(2000, 0, 1, tz), 0, 7, 1)
        const expected = [
          new DateTz(2000, 0, 1, tz),
          new DateTz(2000, 0, 2, tz),
          new DateTz(2000, 0, 3, tz),
          new DateTz(2000, 0, 4, tz),
          new DateTz(2000, 0, 5, tz),
          new DateTz(2000, 0, 6, tz),
          new DateTz(2000, 0, 7, tz)
        ]
        actual.forEach((value, index) =>
          expect(value.toISOString()).toBe(expected[index].toISOString())
        )
      })
    })
  }
})
