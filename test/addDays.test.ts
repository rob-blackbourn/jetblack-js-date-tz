import {
  DateTz,
  IANATimezone,
  addDays,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addDays', () => {
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
      it('should add days', () => {
        const dateTz = new DateTz(2000, 1, 1, tz)
        const actual = addDays(dateTz, 40)
        const expected = new DateTz(2000, 2, 10, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should subtract days', () => {
        const dateTz = new DateTz(2000, 1, 1, tz)
        const actual = addDays(dateTz, -40)
        const expected = new DateTz(1999, 11, 22, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
