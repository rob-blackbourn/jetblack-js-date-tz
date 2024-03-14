import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfWeek', () => {
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
      it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeek(date)
        const expected = new DateTz(2014, 8, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('for Jan 2 2005', () => {
        const date = new DateTz(2005, 1, 2, tz)
        const actual = startOfWeek(date)
        const expected = new DateTz(2005, 1, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
