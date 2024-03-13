import { DateTz, endOfYear, leapSeconds, tzUtc } from '../src'

describe('leapSeconds', () => {
  it('should find two in 1972', () => {
    const startDate = new DateTz('1972-01-01T00:00:00Z', tzUtc)
    const endDate = endOfYear(startDate)
    const actual = leapSeconds(startDate, endDate)
    expect(actual).toBe(2)
  })

  it('should find none from 2000 to 2005', () => {
    const startDate = new DateTz('2000-01-01T00:00:00Z', tzUtc)
    const endDate = endOfYear(new DateTz('2005-01-01T00:00:00Z', tzUtc))
    const actual = leapSeconds(startDate, endDate)
    expect(actual).toBe(0)
  })
})
