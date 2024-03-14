import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeekday,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfWeekday', () => {
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
      it('Should find Sunday from Tuesday September 2 2014 at 02:11:55 with Sunday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 0)
        const expected = new DateTz(2014, 8, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Monday from Tuesday September 2 2014 at 02:11:55 with Monday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 1)
        const expected = new DateTz(2014, 9, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Tuesday from Tuesday September 2 2014 at 02:11:55 with Tuesday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 2)
        const expected = new DateTz(2014, 9, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Wednesday from Tuesday September 2 2014 at 02:11:55 with Wednesday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 3)
        const expected = new DateTz(2014, 8, 27, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Thursday from Tuesday September 2 2014 at 02:11:55 with Thursday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 4)
        const expected = new DateTz(2014, 8, 28, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Friday from Tuesday September 2 2014 at 02:11:55 with Friday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 5)
        const expected = new DateTz(2014, 8, 29, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('Should find Saturday from Tuesday September 2 2014 at 02:11:55 with Saturday as start of week', () => {
        const date = new DateTz(2014, 9, 2, 2, 11, 55, tz)
        const actual = startOfWeekday(date, 6)
        const expected = new DateTz(2014, 8, 30, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
