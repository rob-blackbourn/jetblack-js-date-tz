import { DateTz, minDate } from '../src'

describe('minDate', () => {
  it('should find the smallest date', () => {
    const actual = minDate(
      new DateTz('2000-01-10T00:00:00Z'),
      new DateTz('2000-01-01T00:00:00Z'),
      new DateTz('2000-01-04T00:00:00Z')
    )
    const expected = new DateTz('2000-01-01T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
