import { DateTz, startOfMinute } from '../src'

describe('startOfMinute', () => {
  it('should clear seconds', () => {
    const date = new DateTz('2014-09-02T02:11:55.664Z')
    const actual = startOfMinute(date)
    const expected = new DateTz('2014-09-02T02:11:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new DateTz('2014-09-02T02:11:00Z')
    const actual = startOfMinute(date)
    const expected = new DateTz('2014-09-02T02:11:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
