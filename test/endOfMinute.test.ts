import { DateTz, endOfMinute } from '../src'

describe('endOfMinute', () => {
  it('should find the last moment of the minute', () => {
    const actual = endOfMinute(new DateTz('2000-01-01T00:00:00Z'))
    const expected = new DateTz('2000-01-01T00:00:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
