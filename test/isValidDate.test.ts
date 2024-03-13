import { isValidDate } from '../src'

export { isValidDate } from '../src'

describe('isValidDate', () => {
  it('should find date valid', () => {
    expect(isValidDate(new Date())).toBeTruthy()
  })

  it('should find non-date invalid', () => {
    expect(isValidDate('Hello, World')).toBeFalsy()
  })
  it('should find bad date invalid', () => {
    expect(isValidDate(new Date('foo'))).toBeFalsy()
  })
})
