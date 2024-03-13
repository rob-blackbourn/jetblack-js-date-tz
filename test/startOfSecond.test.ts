import { DateTz, startOfSecond } from '../src'

describe('startOfSecond', () => {
  it('should clear milliseconds', () => {
    const date = new DateTz('2014-09-02T02:11:55.754Z')
    const actual = startOfSecond(date)
    const expected = new DateTz('2014-09-02T02:11:55.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new DateTz('2014-09-02T02:11:55.000Z')
    const actual = startOfSecond(date)
    const expected = new DateTz('2014-09-02T02:11:55.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
