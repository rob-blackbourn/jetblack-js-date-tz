import { Duration } from '../src'

describe('Duration', () => {
  describe('construct', () => {
    it('should construct a duration', () => {
      const expectedYears = 1
      const expectedMonths = 1
      const expectedWeeks = 1
      const expectedDays = 1
      const expectedHours = 1
      const expectedMinutes = 1
      const expectedSeconds = 1
      const actual = new Duration(
        expectedYears,
        expectedMonths,
        expectedWeeks,
        expectedDays,
        expectedHours,
        expectedMinutes,
        expectedSeconds
      )
      expect(actual.years).toBe(expectedYears)
      expect(actual.months).toBe(expectedMonths)
      expect(actual.weeks).toBe(expectedWeeks)
      expect(actual.days).toBe(expectedDays)
      expect(actual.hours).toBe(expectedHours)
      expect(actual.minutes).toBe(expectedMinutes)
      expect(actual.seconds).toBe(expectedSeconds)
    })

    it('should simplify a duration for months', () => {
      const actual = new Duration(0, 24, 0, 0, 0, 0, 0)
      expect(actual.years).toBe(2)
      expect(actual.months).toBe(0)
      expect(actual.weeks).toBe(0)
      expect(actual.days).toBe(0)
      expect(actual.hours).toBe(0)
      expect(actual.minutes).toBe(0)
      expect(actual.seconds).toBe(0)
    })

    it('should simplify a duration for days', () => {
      const actual = new Duration(0, 0, 0, 8, 0, 0, 0)
      expect(actual.years).toBe(0)
      expect(actual.months).toBe(0)
      expect(actual.weeks).toBe(1)
      expect(actual.days).toBe(1)
      expect(actual.hours).toBe(0)
      expect(actual.minutes).toBe(0)
      expect(actual.seconds).toBe(0)
    })
  })

  describe('parse', () => {
    it('should parse an unsigned duration', () => {
      const expected = 'P1Y2M3W4DT5H6M7S'
      const actual = new Duration(expected)
      expect(actual.toString()).toBe(expected)
    })
    it('should parse a positive duration', () => {
      const expected = 'P1Y2M3W4DT5H6M7S'
      const actual = new Duration('+' + expected)
      expect(actual.toString()).toBe(expected)
    })
    it('should parse a negative duration', () => {
      const expected = '-P1Y2M3W4DT5H6M7S'
      const actual = new Duration(expected)
      expect(actual.toString()).toBe(expected)
    })
    it('should parse a wholely negative duration', () => {
      const expected = '-P1Y2M3W4DT5H6M7S'
      const actual = new Duration('P-1Y-2M-3W-4DT-5H-6M-7S')
      expect(actual.toString()).toBe(expected)
    })
    it('should parse a largely negative duration', () => {
      const expected = '-P-10M3W4DT5H6M7S'
      const actual = new Duration('P1Y-2M-3W-4DT-5H-6M-7S')
      expect(actual.toString()).toBe(expected)
    })
    it('should parse a largely positive duration', () => {
      const expected = 'P-10M3W4DT5H6M7S'
      const actual = new Duration(expected)
      expect(actual.toString()).toBe(expected)
    })
  })

  describe('spread', () => {
    it('should spread the properties of a duration', () => {
      const duration = new Duration('P1Y2M3W4DT5H6M7S')
      const { years, months, weeks, days, hours, minutes, seconds } = duration
      expect(years).toBe(1)
      expect(months).toBe(2)
      expect(weeks).toBe(3)
      expect(days).toBe(4)
      expect(hours).toBe(5)
      expect(minutes).toBe(6)
      expect(seconds).toBe(7)
    })
  })

  describe('valueOf', () => {
    it('should roundtrip', () => {
      const expected = new Duration('P1Y2M3W4DT5H6M7S')
      const value = expected.valueOf()
      const actual = new Duration(value)
      expect(actual.toString()).toBe(expected.toString())
    })
    it('should roundtrip negative', () => {
      const expected = new Duration('-P1Y2M3W4DT5H6M7S')
      const value = expected.valueOf()
      const actual = new Duration(value)
      expect(actual.toString()).toBe(expected.toString())
    })
    it('should roundtrip mixed', () => {
      const expected = new Duration('P-1Y2M3W4DT5H6M7S')
      const value = expected.valueOf()
      const actual = new Duration(value)
      expect(actual.valueOf()).toBe(expected.valueOf())
    })
  })

  describe('Symbol[toPrimitive]', () => {
    it('should return string for hint string', () => {
      const expected = 'P1M'
      const actual = new Duration(expected)
      expect(`${actual}`).toBe(expected)
    })

    it('should return number for hint number', () => {
      const expected = 2592000
      const actual = new Duration(expected)
      expect(+actual).toBe(expected)
    })

    it('should return string for hint default', () => {
      const expected = 'P1M'
      const actual = new Duration(expected)
      expect(actual + '').toBe(expected)
    })
  })
})
