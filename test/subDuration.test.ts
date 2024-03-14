import {
  IANATimezone,
  dataToTimezoneOffset,
  Duration,
  subDuration,
  tzLocal,
  tzUtc,
  DateTz
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('subDuration', () => {
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
      it('should subtract duration', () => {
        const duration = new Duration('P1D')
        const actual = subDuration(new DateTz(2000, 1, 1, tz), duration)
        const expected = new DateTz(1999, 12, 31, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })

      it('should subtract a negative duration', () => {
        const duration = new Duration('-P1D')
        const actual = subDuration(new DateTz(2000, 1, 1, tz), duration)
        const expected = new DateTz(2000, 1, 2, tz)
        expect(actual.toISOString()).toBe(expected.toISOString())
      })
    })
  }
})
