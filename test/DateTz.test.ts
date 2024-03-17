import { DateTz, IntlTimezone, tzLocal, tzUtc } from '../src'

describe('DateTz', () => {
  it('should have valid UTC properties', () => {
    const date = new DateTz(0, tzUtc) // Thu 1 January 1970 UTC
    expect(date.toISOString()).toBe('1970-01-01T00:00:00.000Z')
    expect(date.toString()).toBe('1970-01-01T00:00:00.000Z UTC')
    expect(date.year).toBe(1970)
    expect(date.month).toBe(1)
    expect(date.day).toBe(1)
    expect(date.hours).toBe(0)
    expect(date.minutes).toBe(0)
    expect(date.seconds).toBe(0)
    expect(date.milliseconds).toBe(0)
    expect(date.weekday).toBe(4)
  })

  it('should have valid local properties', () => {
    const date = new DateTz(1970, 1, 1, tzLocal)
    expect(date.year).toBe(1970)
    expect(date.month).toBe(1)
    expect(date.day).toBe(1)
    expect(date.hours).toBe(0)
    expect(date.minutes).toBe(0)
    expect(date.seconds).toBe(0)
    expect(date.milliseconds).toBe(0)
    expect(date.weekday).toBe(4)
  })

  it('should have valid date properties', () => {
    const tzChicago = new IntlTimezone('America/Chicago')
    const date = new DateTz(1970, 1, 1, tzChicago)
    expect(date.toISOString()).toBe('1970-01-01T00:00:00-06:00')
    expect(date.toString()).toBe('1970-01-01T00:00:00-06:00 America/Chicago')
    expect(date.year).toBe(1970)
    expect(date.month).toBe(1)
    expect(date.day).toBe(1)
    expect(date.hours).toBe(0)
    expect(date.minutes).toBe(0)
    expect(date.seconds).toBe(0)
    expect(date.milliseconds).toBe(0)
    expect(date.weekday).toBe(4)
  })

  it('should have valid IANA properties', () => {
    const date = new DateTz(1970, 1, 1, 19, 30, tzUtc)
    const tzChicago = new IntlTimezone('America/Chicago')
    const dateWithChicago = date.with(tzChicago)
    expect(dateWithChicago.toISOString()).toBe('1970-01-01T13:30:00-06:00')

    const dateAsChicago = date.as(tzChicago)
    expect(dateAsChicago.toISOString()).toBe('1970-01-01T19:30:00-06:00')

    const offset = (date.getTime() - dateAsChicago.getTime()) / 60 / 1000
    expect(offset).toBe(dateAsChicago.offset)
  })

  it('should construct', () => {
    const date = new DateTz(1970, 1, 1, tzLocal)
    const time = date.getTime()

    const dates = [
      new DateTz(new Date(time)),
      new DateTz(new Date(time), tzLocal),
      new DateTz(time),
      new DateTz(time, tzLocal),
      new DateTz('1970-01-01'),
      new DateTz('1970-01-01', tzLocal),
      new DateTz('1970-01-01T00:00:00'),
      new DateTz('1970-01-01T00:00:00', tzLocal),
      new DateTz(1970, 1),
      new DateTz(1970, 1, tzLocal),
      new DateTz(1970, 1, 1),
      new DateTz(1970, 1, 1, tzLocal),
      new DateTz(1970, 1, 1, 0),
      new DateTz(1970, 1, 1, 0, tzLocal),
      new DateTz(1970, 1, 1, 0, 0),
      new DateTz(1970, 1, 1, 0, 0, tzLocal),
      new DateTz(1970, 1, 1, 0, 0, 0),
      new DateTz(1970, 1, 1, 0, 0, 0, tzLocal),
      new DateTz(1970, 1, 1, 0, 0, 0, 0),
      new DateTz(1970, 1, 1, 0, 0, 0, 0, tzLocal)
    ]

    dates.forEach(actual => expect(actual.getTime()).toBe(date.getTime()))
  })
})
