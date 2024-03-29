import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  isoWeekDate,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('isoWeekDate', () => {
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
      it('should handle contemporary dates', () => {
        const samples = [
          { date: new DateTz(1977, 1, 1, tz), expected: [1976, 53, 6] },
          { date: new DateTz(1977, 1, 2, tz), expected: [1976, 53, 7] },
          { date: new DateTz(1977, 12, 31, tz), expected: [1977, 52, 6] },
          { date: new DateTz(1978, 1, 1, tz), expected: [1977, 52, 7] },
          { date: new DateTz(1978, 1, 2, tz), expected: [1978, 1, 1] },
          { date: new DateTz(1978, 12, 31, tz), expected: [1978, 52, 7] },
          { date: new DateTz(1979, 1, 1, tz), expected: [1979, 1, 1] },
          { date: new DateTz(1979, 12, 30, tz), expected: [1979, 52, 7] },
          { date: new DateTz(1979, 12, 31, tz), expected: [1980, 1, 1] },
          { date: new DateTz(1980, 1, 1, tz), expected: [1980, 1, 2] },
          { date: new DateTz(1980, 12, 28, tz), expected: [1980, 52, 7] },
          { date: new DateTz(1980, 12, 29, tz), expected: [1981, 1, 1] },
          { date: new DateTz(1980, 12, 30, tz), expected: [1981, 1, 2] },
          { date: new DateTz(1980, 12, 31, tz), expected: [1981, 1, 3] },
          { date: new DateTz(1981, 1, 1, tz), expected: [1981, 1, 4] },
          { date: new DateTz(1981, 12, 31, tz), expected: [1981, 53, 4] },
          { date: new DateTz(1982, 1, 1, tz), expected: [1981, 53, 5] },
          { date: new DateTz(1982, 1, 2, tz), expected: [1981, 53, 6] },
          { date: new DateTz(1982, 1, 3, tz), expected: [1981, 53, 7] }
        ]
        samples.forEach(({ date, expected }) => {
          expect(isoWeekDate(date)).toStrictEqual(expected)
        })
      })
    })
  }
})
