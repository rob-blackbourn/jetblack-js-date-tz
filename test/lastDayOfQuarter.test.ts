import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  lastDayOfQuarter,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('lastDayOfQuarter', () => {
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
      it('should find the last day of the quarter', () => {
        const actual = lastDayOfQuarter(new DateTz(2000, 1, 1, tz))
        const expected = new DateTz(2000, 3, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
