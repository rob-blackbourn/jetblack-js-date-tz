import { DateTz } from './DateTz'

/**
 * Check if a value is a valid date.
 *
 * ```js
 * import { DateTz, isValidDate } from '@jetblack/date-tz'
 *
 * > const value = new DateTz("foo")
 * > console.log(isValidDate(value))
 * false
 * ```
 * @param value The value to check.
 * @returns True if the value is a valid date.
 */
export function isValidDate(value: any): boolean {
  return (
    value instanceof DateTz &&
    value.date instanceof Date &&
    !Number.isNaN(value.date.valueOf())
  )
}
