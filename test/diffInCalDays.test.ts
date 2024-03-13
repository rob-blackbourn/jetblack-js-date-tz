import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  diffInCalDays,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('diffInCalDays', () => {
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
      it('should difference dates across years', () => {
        const actual = diffInCalDays(
          new DateTz(2000, 5, 2, tz),
          new DateTz(1999, 11, 21, tz)
        )
        const expected = 164
        expect(actual).toBe(expected)
      })
      it('should difference dates between years', () => {
        const actual = diffInCalDays(
          new DateTz(2000, 5, 2, tz),
          new DateTz(2000, 0, 1, tz)
        )
        const expected = 153
        expect(actual).toBe(expected)
      })
    })
  }

  it('should handle dst', () => {
    const actual = diffInCalDays(
      new DateTz(2000, 3, 2, tzChicago),
      new DateTz(2000, 2, 31, 23, tzChicago)
    )
    const expected = 2
    expect(actual).toBe(expected)
  })
})
