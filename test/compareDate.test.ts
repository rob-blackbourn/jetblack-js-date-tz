import { DateTz, compareDateAsc, compareDateDesc } from '../src'

describe('compareDate', () => {
  const jan1 = new DateTz('2000-01-01T00:00:00Z')
  const jan2 = new DateTz('2000-01-02T00:00:00Z')

  describe('compareDateAsc', () => {
    it('should be greater', () => {
      expect(compareDateAsc(jan2, jan1)).toBe(1)
    })

    it('should be lesser', () => {
      expect(compareDateAsc(jan1, jan2)).toBe(-1)
    })

    it('should be equal', () => {
      expect(compareDateAsc(jan1, jan1)).toBe(0)
    })
  })

  describe('compareDateDesc', () => {
    it('should be greater', () => {
      expect(compareDateDesc(jan1, jan2)).toBe(1)
    })

    it('should be lesser', () => {
      expect(compareDateDesc(jan2, jan1)).toBe(-1)
    })

    it('should be equal', () => {
      expect(compareDateDesc(jan1, jan1)).toBe(0)
    })
  })
})
