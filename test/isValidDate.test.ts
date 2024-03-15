import { DateTz, isValidDate } from '../src'

export { isValidDate } from '../src'

describe('isValidDate', () => {
  it('should find date valid', () => {
    expect(isValidDate(new DateTz())).toBeTruthy()
  })

  it('should find non-date invalid', () => {
    expect(isValidDate('Hello, World')).toBeFalsy()
  })
  it('should find bad date invalid', () => {
    expect(isValidDate(new DateTz('foo'))).toBeFalsy()
  })
})
