import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  easter,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('easter', () => {
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
      it('should calculate Easter in 2001', () => {
        const actual = easter(2001, tz)
        const expected = new DateTz(2001, 3, 15, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2002', () => {
        const actual = easter(2002, tz)
        const expected = new DateTz(2002, 2, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2003', () => {
        const actual = easter(2003, tz)
        const expected = new DateTz(2003, 3, 20, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2004', () => {
        const actual = easter(2004, tz)
        const expected = new DateTz(2004, 3, 11, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2005', () => {
        const actual = easter(2005, tz)
        const expected = new DateTz(2005, 2, 27, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2006', () => {
        const actual = easter(2006, tz)
        const expected = new DateTz(2006, 3, 16, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2007', () => {
        const actual = easter(2007, tz)
        const expected = new DateTz(2007, 3, 8, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should calculate Easter in 2008', () => {
        const actual = easter(2008, tz)
        const expected = new DateTz(2008, 2, 23, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
