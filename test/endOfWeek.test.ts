import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  endOfWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('endOfWeek', () => {
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
      it('should find the last moment of the week from Sunday', () => {
        const date = new DateTz(2022, 6, 3, tz) // Sun 3 July 2022
        const actual = endOfWeek(date)
        const expected = new DateTz(2022, 6, 9, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should find the last moment of the week from Wednesday', () => {
        const date = new DateTz(2022, 6, 6, tz) // Wed 6 July 2022
        const actual = endOfWeek(date)
        const expected = new DateTz(2022, 6, 9, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should find the last moment of the week from Saturday', () => {
        const date = new DateTz(2022, 6, 9, tz)
        const actual = endOfWeek(date)
        const expected = new DateTz(2022, 6, 9, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
