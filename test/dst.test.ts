import {
  DateTz,
  IANATimezone,
  addMinutes,
  dataToTimezoneOffset,
  tzUtc
} from '../src'
import londonTzData from '@jetblack/tzdata/dist/latest/Europe/London.json'

describe('dst', () => {
  // London clocks got forward: Sunday, March 26, 1:00 am.
  // London clocks go back: Sunday, October 29, 2:00 am
  const tzLondon = new IANATimezone(
    'Europe/London',
    londonTzData.map(dataToTimezoneOffset)
  )

  it('should know daylight savings', () => {
    expect(
      new DateTz('2000-03-26T00:59:59', tzLondon).isDaylightSavings
    ).toBeFalsy()
    expect(
      new DateTz('2000-03-26T01:00:00', tzLondon).isDaylightSavings
    ).toBeTruthy()
    expect(
      new DateTz('2000-10-29T00:59:59', tzLondon).isDaylightSavings
    ).toBeTruthy()
    expect(
      new DateTz('2000-10-29T01:00:00', tzLondon).isDaylightSavings
    ).toBeFalsy()
  })

  it('should know offset', () => {
    expect(new DateTz('2000-03-26T00:59:59', tzLondon).offset).toBe(0)
    expect(new DateTz('2000-03-26T01:00:00', tzLondon).offset).toBe(60)
    expect(new DateTz('2000-10-29T00:59:59', tzLondon).offset).toBe(60)
    expect(new DateTz('2000-10-29T01:00:00', tzLondon).offset).toBe(0)
  })

  it('should show time', () => {
    expect(new DateTz(2000, 2, 26, tzLondon).toISOString()).toBe(
      '2000-03-26T00:00:00+00:00'
    )
    expect(new DateTz(2000, 2, 27, tzLondon).toISOString()).toBe(
      '2000-03-27T00:00:00+01:00'
    )
    expect(new DateTz(2000, 9, 29, tzLondon).toISOString()).toBe(
      '2000-10-29T00:00:00+01:00'
    )
    expect(new DateTz(2000, 9, 30, tzLondon).toISOString()).toBe(
      '2000-10-30T00:00:00+00:00'
    )
  })

  it('should spring forward', () => {
    // London clocks got forward: Sunday, March 26, 1:00 am.
    const almostMidnight = new DateTz(2000, 2, 25, 23, 59, 0, tzLondon)
    expect(almostMidnight.toISOString()).toBe('2000-03-25T23:59:00+00:00')
    expect(addMinutes(almostMidnight, 60).toISOString()).toBe(
      '2000-03-26T00:59:00+00:00' // no change till 1am.
    )
    expect(addMinutes(almostMidnight, 60 + 1).toISOString()).toBe(
      '2000-03-26T02:00:00+01:00' // skip 1am for 2am+01:00
    )
  })

  it('should fall back', () => {
    const almostMidnight = new DateTz(2000, 9, 28, 23, 59, 0, tzLondon)
    expect(almostMidnight.toISOString()).toBe('2000-10-28T23:59:00+01:00')
    expect(addMinutes(almostMidnight, 1).toISOString()).toBe(
      '2000-10-29T00:00:00+01:00'
    )
    expect(addMinutes(almostMidnight, 61).toISOString()).toBe(
      '2000-10-29T01:00:00+01:00'
    )
    expect(addMinutes(almostMidnight, 90).toISOString()).toBe(
      '2000-10-29T01:29:00+01:00'
    )
  })
})
