import { DateTz, addMilliseconds } from '../src'

describe('addMilliseconds', () => {
  it('should add milliseconds', () => {
    const actual = addMilliseconds(new DateTz('2000-01-01T00:00:00.000Z'), 1)
    const expected = new DateTz('2000-01-01T00:00:00.001Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract milliseconds', () => {
    const actual = addMilliseconds(new DateTz('2000-01-01T00:00:00.000Z'), -1)
    const expected = new DateTz('1999-12-31T23:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
