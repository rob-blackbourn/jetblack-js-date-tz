import {
  DateTz,
  IANATimezone,
  dataToTimezoneOffset,
  formatDate,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('formatDate', () => {
  const tzChicago = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )
  const tzTokyo = new IANATimezone(
    'Asia/Tokyo',
    tokyoTzData.map(dataToTimezoneOffset)
  )

  it('should pass smoke test for chicago en', () => {
    const d = new DateTz(2022, 7, 2, 6, 39, 15, 291, tzChicago)
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', 'en')
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 America/Chicago')
  })

  it('should pass smoke test for tokyo en', () => {
    const d = new DateTz(2022, 7, 2, 6, 39, 15, 291, tzTokyo)
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', 'en')
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 Asia/Tokyo')
  })

  it('should pass smoke test for UTC en', () => {
    const d = new DateTz(2022, 7, 2, 6, 39, 15, 291, tzUtc)
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', 'en')
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })

  it('should pass smoke test for UTC fr', () => {
    const d = new DateTz(2022, 7, 2, 6, 39, 15, 291, tzUtc)
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', 'fr')
    expect(s).toBe('sam., 02 juil. 2022 06:39:15 UTC')
  })

  it('should pad d when necessary', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'd')).toBe('9')
    expect(formatDate(new DateTz(2001, 1, 19, tzUtc), 'd')).toBe('19')
  })

  it('should always pad dd when necessary', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'dd')).toBe('09')
    expect(formatDate(new DateTz(2001, 1, 19, tzUtc), 'dd')).toBe('19')
  })

  it('should get ddd', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'ddd', 'en')).toBe('Tue')
  })

  it('should get dddd', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'dddd', 'en')).toBe(
      'Tuesday'
    )
  })

  it('should get DDD', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'DDD', 'en')).toBe('T')
  })

  it('should pluralize', () => {
    expect(formatDate(new DateTz(2001, 1, 1, tzUtc), 'DD', 'en')).toBe('1st')
    expect(formatDate(new DateTz(2001, 2, 2, tzUtc), 'DD', 'en')).toBe('2nd')
    expect(formatDate(new DateTz(2001, 1, 3, tzUtc), 'DD', 'en')).toBe('3rd')
    expect(formatDate(new DateTz(2001, 1, 4, tzUtc), 'DD', 'en')).toBe('4th')
    expect(formatDate(new DateTz(2001, 1, 22, tzUtc), 'DD', 'en')).toBe('22nd')
    expect(formatDate(new DateTz(2001, 1, 31, tzUtc), 'DD', 'en')).toBe('31st')
  })

  it('should pad m when necessary', () => {
    expect(formatDate(new DateTz(2001, 9, 9, tzUtc), 'm', 'en')).toBe('9')
    expect(formatDate(new DateTz(2001, 10, 19, tzUtc), 'm', 'en')).toBe('10')
  })

  it('should always pad mm when necessary', () => {
    expect(formatDate(new DateTz(2001, 9, 10, tzUtc), 'mm', 'en')).toBe('09')
    expect(formatDate(new DateTz(2001, 10, 11, tzUtc), 'mm', 'en')).toBe('10')
  })

  it('should get mmm', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'mmm', 'en')).toBe('Jan')
  })

  it('should get mmmm', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'mmmm', 'en')).toBe(
      'January'
    )
  })

  it('should get yy', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'yy', 'en')).toBe('01')
  })

  it('should get yyyy', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'yyyy', 'en')).toBe('2001')
  })

  it('should pad H when necessary', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, tzUtc), 'H', 'en')).toBe('1')
    expect(formatDate(new DateTz(2001, 1, 19, 13, tzUtc), 'H', 'en')).toBe('13')
  })

  it('should always pad HH', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, tzUtc), 'HH', 'en')).toBe('01')
  })

  it('should pad M when necessary', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, 1, tzUtc), 'M', 'en')).toBe('1')
    expect(formatDate(new DateTz(2001, 1, 19, 13, 13, tzUtc), 'M', 'en')).toBe(
      '13'
    )
  })

  it('should always pad MM', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, 2, tzUtc), 'MM', 'en')).toBe(
      '02'
    )
  })

  it('should pad S when necessary', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, 1, 5, tzUtc), 'S', 'en')).toBe(
      '5'
    )
    expect(
      formatDate(new DateTz(2001, 1, 19, 13, 13, 26, tzUtc), 'S', 'en')
    ).toBe('26')
  })

  it('should always pad SS', () => {
    expect(formatDate(new DateTz(2001, 1, 9, 1, 2, 59, tzUtc), 'S', 'en')).toBe(
      '59'
    )
  })

  it('should get F', () => {
    expect(
      formatDate(new DateTz(2001, 1, 9, 1, 2, 59, 123, tzUtc), 'F', 'en')
    ).toBe('1')
  })

  it('should get FF', () => {
    expect(
      formatDate(new DateTz(2001, 1, 9, 1, 2, 59, 123, tzUtc), 'FF', 'en')
    ).toBe('12')
    expect(
      formatDate(new DateTz(2001, 1, 9, 1, 2, 59, 23, tzUtc), 'FF', 'en')
    ).toBe('02')
  })

  it('should get FFF', () => {
    expect(
      formatDate(new DateTz(2001, 1, 9, 1, 2, 59, 123, tzUtc), 'FFF', 'en')
    ).toBe('123')
    expect(
      formatDate(new DateTz(2001, 1, 9, 1, 2, 59, 3, tzUtc), 'FFF', 'en')
    ).toBe('003')
  })

  it('should allow custom text', () => {
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'yyyy [yyyy]', 'en')).toBe(
      '2001 yyyy'
    )
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), 'yyyy "yyyy"', 'en')).toBe(
      '2001 yyyy'
    )
    expect(formatDate(new DateTz(2001, 1, 9, tzUtc), "yyyy 'yyyy'", 'en')).toBe(
      '2001 yyyy'
    )
  })
})
