import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  dateScheduleByQuarter,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateScheduleByQuarter', () => {
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
        const actual = dateScheduleByQuarter(
          new DateTz(2000, 0, 1, tz),
          0,
          4,
          1
        )
        const expected = [
          new DateTz(2000, 0, 1, tz),
          new DateTz(2000, 3, 1, tz),
          new DateTz(2000, 6, 1, tz),
          new DateTz(2000, 9, 1, tz)
        ]
        actual.forEach((value, index) =>
          expect(value.toISOString()).toBe(expected[index].toISOString())
        )
      })
    })
  }
})
