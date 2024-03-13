import { isLeapYear } from '../src'

describe('isLeapYear', () => {
  it('should be a century leap year in 2000', () => {
    expect(isLeapYear(2000)).toBeTruthy()
  })

  it('should not be a century leap year in 1900', () => {
    expect(isLeapYear(1900)).toBeFalsy()
  })

  it('should be a regular leap year in 2004', () => {
    expect(isLeapYear(2004)).toBeTruthy()
  })

  it('should not be a regular leap year in 2005', () => {
    expect(isLeapYear(2005)).toBeFalsy()
  })
})
