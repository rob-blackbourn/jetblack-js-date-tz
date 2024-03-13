import {
  DateTz,
  HolidayCalendar,
  IANATimezone,
  addBusinessDays,
  calWeekends,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addBusinessDays', () => {
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
      describe('with the default weekend calendar', () => {
        it('should add business days within week', () => {
          // Mon 3 Jan 2000
          const actual = addBusinessDays(
            new DateTz(2000, 0, 3, tz),
            1,
            calWeekends
          )
          const expected = new DateTz(2000, 0, 4, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract business days within week', () => {
          // Tue 4 Jan 2000
          const actual = addBusinessDays(
            new DateTz(2000, 0, 4, tz),
            -1,
            calWeekends
          )
          const expected = new DateTz(2000, 0, 3, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should add business days across a weekend', () => {
          // Fri 7 Jan 2000
          const actual = addBusinessDays(
            new DateTz(2000, 0, 7, tz),
            1,
            calWeekends
          )
          const expected = new DateTz(2000, 0, 10, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract business days across a weekend', () => {
          // Mon 10 Jan 2000
          const actual = addBusinessDays(
            new DateTz(2000, 0, 10, tz),
            -1,
            calWeekends
          )
          const expected = new DateTz(2000, 0, 7, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })
      })

      describe('with custom calendar', () => {
        const cal = new HolidayCalendar(
          'cal',
          [0, 6],
          [
            new DateTz(2015, 0, 1, tz),
            new DateTz(2015, 3, 3, tz),
            new DateTz(2015, 3, 6, tz),
            new DateTz(2015, 4, 1, tz),
            new DateTz(2015, 11, 25, tz),
            new DateTz(2015, 11, 26, tz)
          ]
        )

        it('should add and skip New Years day', () => {
          const date = new DateTz(2015, 0, 1, tz)
          const actual = addBusinessDays(date, 5, cal)
          const expected = new DateTz(2015, 0, 8, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should add but nothing to skip', () => {
          const date = new DateTz(2015, 0, 2, tz)
          const actual = addBusinessDays(date, 4, cal)
          const expected = new DateTz(2015, 0, 8, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should add and skip', () => {
          const date = new DateTz(2014, 11, 29, tz)
          const actual = addBusinessDays(date, 3, cal)
          const expected = new DateTz(2015, 0, 2, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract and skip New Years day', () => {
          const date = new DateTz(2015, 0, 8, tz)
          const actual = addBusinessDays(date, -5, cal)
          const expected = new DateTz(2014, 11, 31, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract but nothing to skip', () => {
          const date = new DateTz(2015, 0, 8, tz)
          const actual = addBusinessDays(date, -4, cal)
          const expected = new DateTz(2015, 0, 2, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })

        it('should subtract and skip', () => {
          const date = new DateTz(2015, 0, 2, tz)
          const actual = addBusinessDays(date, -2, cal)
          const expected = new DateTz(2014, 11, 30, tz)
          expect(actual.toISOString()).toBe(expected.toISOString())
        })
      })
    })
  }
})
