import {
  DateTz,
  IANATimezone,
  areInSameQuarter,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('areInSameQuarter', () => {
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
      it('should be true', () => {
        expect(
          areInSameQuarter(
            new DateTz(2000, 1, 1, tz),
            new DateTz(2000, 3, 1, tz)
          )
        ).toBeTruthy()

        expect(
          areInSameQuarter(
            new DateTz(2000, 4, 1, tz),
            new DateTz(2000, 4, 1, tz)
          )
        ).toBeTruthy()

        expect(
          areInSameQuarter(
            new DateTz(2000, 7, 1, tz),
            new DateTz(2000, 9, 1, tz)
          )
        ).toBeTruthy()

        expect(
          areInSameQuarter(
            new DateTz(2000, 10, 1, tz),
            new DateTz(2000, 12, 1, tz)
          )
        ).toBeTruthy()

        expect(
          areInSameQuarter(
            new DateTz(2000, 1, 1, tz),
            new DateTz(2001, 2, 1, tz)
          )
        ).toBeTruthy()
      })

      it('should be false', () => {
        expect(
          areInSameQuarter(
            new DateTz(2000, 1, 1, tz),
            new DateTz(2000, 4, 1, tz)
          )
        ).toBeFalsy()

        expect(
          areInSameQuarter(
            new DateTz(2000, 1, 1, tz),
            new DateTz(2001, 4, 1, tz)
          )
        ).toBeFalsy()
      })
    })
  }
})
