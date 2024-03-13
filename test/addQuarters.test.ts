import {
  DateTz,
  IANATimezone,
  addQuarters,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addQuarters', () => {
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
      it('should add months', () => {
        const date = new DateTz(2000, 0, 1, tz)
        const actual = addQuarters(date, 13)
        const expected = new DateTz(2003, 3, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should subtract months', () => {
        const date = new DateTz(2000, 0, 1, tz)
        const actual = addQuarters(date, -13)
        const expected = new DateTz(1996, 9, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
