import { DateTz, addSeconds } from '../src'

describe('addSeconds', () => {
  it('should add seconds', () => {
    const actual = addSeconds(new DateTz('2000-01-01T00:00:00Z'), 1)
    const expected = new DateTz('2000-01-01T00:00:01Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract seconds', () => {
    const actual = addSeconds(new DateTz('2000-01-01T00:00:00Z'), -1)
    const expected = new DateTz('1999-12-31T23:59:59Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
