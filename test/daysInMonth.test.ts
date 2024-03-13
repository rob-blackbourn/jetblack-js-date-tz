import { daysInMonth } from '../src'

describe('diffInCalDays', () => {
  it('should be 31 days in January', () => {
    expect(daysInMonth(2009, 0)).toBe(31)
  })

  it('should be 28 days in February in a non leap year', () => {
    expect(daysInMonth(2009, 1)).toBe(28)
  })

  it('should be 29 days in February in a leap year', () => {
    expect(daysInMonth(2008, 1)).toBe(29)
  })

  it('should be 31 days in March', () => {
    expect(daysInMonth(2009, 2)).toBe(31)
  })

  it('should be 30 days in April', () => {
    expect(daysInMonth(2009, 3)).toBe(30)
  })

  it('should be 31 days in May', () => {
    expect(daysInMonth(2009, 4)).toBe(31)
  })

  it('should be 30 days in June', () => {
    expect(daysInMonth(2009, 5)).toBe(30)
  })

  it('should be 31 days in July', () => {
    expect(daysInMonth(2009, 6)).toBe(31)
  })

  it('should be 31 days in August', () => {
    expect(daysInMonth(2009, 7)).toBe(31)
  })

  it('should be 30 days in September', () => {
    expect(daysInMonth(2009, 8)).toBe(30)
  })

  it('should be 31 days in October', () => {
    expect(daysInMonth(2009, 9)).toBe(31)
  })

  it('should be 30 days in November', () => {
    expect(daysInMonth(2009, 10)).toBe(30)
  })

  it('should be 31 days in December', () => {
    expect(daysInMonth(2009, 11)).toBe(31)
  })
})
