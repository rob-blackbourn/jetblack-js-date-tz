import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  endOfWeekday,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('endOfWeekday', () => {
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
      it('should find the last moment of the week from Monday', () => {
        const date = new DateTz(2022, 6, 4, tz) // Mon 4 July 2022
        const actual = endOfWeekday(date, 1)
        const expected = new DateTz(2022, 6, 10, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should find the last moment of the week from Wednesday', () => {
        const date = new DateTz(2022, 6, 6, tz) // Wed 6 July 2022
        const actual = endOfWeekday(date, 1)
        const expected = new DateTz(2022, 6, 10, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should find the last moment of the week from Sunday', () => {
        const date = new DateTz(2022, 6, 10, tz)
        const actual = endOfWeekday(date, 1)
        const expected = new DateTz(2022, 6, 10, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
