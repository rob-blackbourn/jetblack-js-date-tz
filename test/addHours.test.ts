import { DateTz, addHours, tzUtc } from '../src'

describe('addHours', () => {
  it('should add hours', () => {
    const actual = addHours(new DateTz('2000-01-01T00:00:00Z'), 1)
    const expected = new DateTz('2000-01-01T01:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract hours', () => {
    const actual = addHours(new DateTz('2000-01-01T00:00:00Z'), -1)
    const expected = new DateTz('1999-12-31T23:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
