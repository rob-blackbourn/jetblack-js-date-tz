import {
  DateTz,
  IANATimezone,
  addNthDayOfWeek,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

/*
     June 2015
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30
*/

describe('addNthDayOfWeek', () => {
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
      it('should not change as the first Monday is the same date', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 1, tz), // Monday 1st June 2015
          1, // 1st Monday
          1, // Monday
          false // Don't require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 1, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should go to the next week when strictly different', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 1, tz), // Monday 1st June 2015
          1, // 1st Monday
          1, // Monday
          true // Require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 8, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should choose the first Tuesday as the next date', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 1, tz), // Monday 1st June 2015
          1, // 1st Tuesday
          2, // Tuesday
          false // Don't require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should choose the first Tuesday as the next date regardless of strict difference', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 1, tz), // Monday 1st June 2015
          1, // 1st Tuesday
          2, // Tuesday
          true // Require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should choose the third Wednesday', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 1, tz), // Monday 1st June 2015
          3, // third
          3, // Wednesday
          true // Require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 17, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should not change as the last Tuesday is the same date', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 30, tz), // Monday 1st June 2015
          -1, // back one
          2, // Tuesday
          false // Don't require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 30, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should find the third Wednesday from the end of the month', () => {
        const actual = addNthDayOfWeek(
          new DateTz(2015, 6, 30, tz), // Monday 1st June 2015
          -3, // back three
          3, // Wednesday
          true // Require the returned date to be different.
        )
        const expected = new DateTz(2015, 6, 10, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
