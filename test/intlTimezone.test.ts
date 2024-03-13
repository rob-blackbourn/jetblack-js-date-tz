import { IANATimezone, IntlTimezone, dataToTimezoneOffset } from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import sydneyTzData from '@jetblack/tzdata/dist/latest/Australia/Sydney.json'
import santiagoTzData from '@jetblack/tzdata/dist/latest/America/Santiago.json'
import osloTzData from '@jetblack/tzdata/dist/latest/Europe/Oslo.json'

describe('IntlTimezone', () => {
  const tzChicagoIANA = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )
  const tzChicagoIntl = new IntlTimezone('America/Chicago')
  const tzSydneyIANA = new IANATimezone(
    'Australia/Sydney',
    sydneyTzData.map(dataToTimezoneOffset)
  )
  const tzSydneyIntl = new IntlTimezone('Australia/Sydney')
  const tzSantiagoIANA = new IANATimezone(
    'America/Santiago',
    santiagoTzData.map(dataToTimezoneOffset)
  )
  const tzSantiagoIntl = new IntlTimezone('America/Santiago')
  const tzOsloIANA = new IANATimezone(
    'Europe/Oslo',
    osloTzData.map(dataToTimezoneOffset)
  )
  const tzOsloIntl = new IntlTimezone('Europe/Oslo')

  it('should know offset in Chicago in the winter', () => {
    const d = new Date('2024-12-31T23:59:59.999Z')
    const actual = tzChicagoIntl.offset(d)
    const expected = tzChicagoIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Chicago in the summer', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzChicagoIntl.offset(d)
    const expected = tzChicagoIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Oslo in the winter', () => {
    const d = new Date('2024-12-31T23:59:59.999Z')
    const actual = tzOsloIntl.offset(d)
    const expected = tzOsloIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Oslo in the summer', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzOsloIntl.offset(d)
    const expected = tzOsloIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Santiago in the winter', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzSantiagoIntl.offset(d)
    const expected = tzSantiagoIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Santiago in the summer', () => {
    const d = new Date('2024-12-31T23:59:59.999Z')
    const actual = tzSantiagoIntl.offset(d)
    const expected = tzSantiagoIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Sydney in the winter', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzSydneyIntl.offset(d)
    const expected = tzSydneyIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know offset in Sydney in the summer', () => {
    const d = new Date('2024-12-31T23:59:59.999Z')
    const actual = tzSydneyIntl.offset(d)
    const expected = tzSydneyIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in Chicago, western northern hemisphere', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzChicagoIntl.isDaylightSavings(d)
    const expected = tzChicagoIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in Sydney, eastern southern hemisphere', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzSydneyIntl.isDaylightSavings(d)
    const expected = tzSydneyIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in Santiago, western southern hemisphere', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzSantiagoIntl.isDaylightSavings(d)
    const expected = tzSantiagoIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in Oslo, eastern northern hemisphere', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzOsloIntl.isDaylightSavings(d)
    const expected = tzOsloIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })
})
