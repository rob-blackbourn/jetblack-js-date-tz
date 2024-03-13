import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  endOfDay,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('endOfDay', () => {
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
      it('should find the last moment of the day', () => {
        const date = new DateTz(2000, 0, 1, tz)
        const actual = endOfDay(date)
        const expected = new DateTz(2000, 0, 1, 23, 59, 59, 999, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
