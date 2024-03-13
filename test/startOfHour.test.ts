import { DateTz, startOfHour } from '../src'

describe('startOfHour', () => {
  it('should clear minutes', () => {
    const date = new DateTz('2014-09-02T02:11:55.664Z')
    const actual = startOfHour(date)
    const expected = new DateTz('2014-09-02T02:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new DateTz('2014-09-02T02:00:00Z')
    const actual = startOfHour(date)
    const expected = new DateTz('2014-09-02T02:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
