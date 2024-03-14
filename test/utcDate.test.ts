import { DateTz, tzUtc } from '../src'

describe('utcDate', () => {
  it('should construct a date', () => {
    const actual = new DateTz(2000, 1, 1, tzUtc)
    const expected = new DateTz('2000-01-01T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should construct a date with time', () => {
    const actual = new DateTz(2000, 1, 1, 12, 30, 15, 250, tzUtc)
    const expected = new DateTz('2000-01-01T12:30:15.250Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should have no timezone offset', () => {
    const date = new DateTz(2000, 1, 1, 12, 30, 15, 250, tzUtc)
    const actual = date.offset
    expect(actual).toBe(0)
  })
})
