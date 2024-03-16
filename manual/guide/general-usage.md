## Constructing Dates

Dates are constructed by calling the `DateTz` constructor, or with the `parseDate` function.
The constructor takes the same arguments as the built in
[`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
class with an optional final argument of a time zone. If left unspecified the local zone is used.

Unlike the built in date class months start at 1 for January.

```js
import { DateTz, tzLocal, tzUtc, IntlTimezone } from '@jetblack/date-tz'

const d1 = new DateTz(2000, 6, 1, tzLocal)
const d2 = new DateTz(2000, 1, 1, 12, 30, tzUtc)

const tzTokyo = new IntlTimezone('Asia/Tokyo')
const d3 = new DateTz(2000, 6, 1, 21, 0, 15, 250, tzTokyo)
```

The {@linkcode parseDate} function constructs a date from a string and a given
format.

```js
import { DateTz, tzLocal, tzUtc, fetchTimezone, parseDate } from '@jetblack/date-tz'

const d1 = parseDate("1-Jul-00", "d-mmm-yy", tzLocal)
const d2 = parseDate("1-Jan-00 12:30", "d-mmm-yy HH:MM", tzUtc)

const tzTokyo = await fetchTimezone('Asia/Tokyo')
const d3 = parseDate("1-Jul-00 21:00:15.250", "d-mmm-yy HH:MM:SS.FFF", tzTokyo)
```

## Deconstructing Dates

The built in date class has accessor functions to get and set the date parts
in local and UTC (e.g.
[`getMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth),
[`getUTCMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth),
[`setMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth),
[`setUTCMonth`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth)
).

This library treats dates as immutable, so it has no setters; a new date must be
created. There are two ways of accessing the date parts:
{@linkcode Timezone.dateParts | dateParts} which returns a simple object with
the parts, and individual accessors (e.g. {@linkcode Timezone.monthIndex | monthIndex}).

```js
import { DateTz } from '@jetblack/dates-tz'

const date = new DateTz()
const { year, month, day } = date.parts
const y = date.year
const m = date.month
const d = date.day
```

For efficiency {@linkcode DateTz.parts | parts} should be used if more
than one part is required.

## Displaying Dates

The built in date class has several methods for displaying dates, all of which are either
specific to the local timezone or specific to UTC. These have little flexibility; the most
useful being [`toISOString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

The [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) provides more flexible options, and allows passing in the IANA timezone.

This library provides two means of displaying dates: {@linkcode DateTz.toISOString}
and {@linkcode formatDate}. The {@linkcode DateTz.toISOString} differs from
the built in method, in that it displays the date in the context of the provided
timezone, rather than the local timezone. The
{@linkcode formatDate} function is a typical pattern-style formatter.

The following demonstrates some of these functions.

```js
import { formatDate, DateTz, IntlTimezone } from '@jetblack/date-tz'

const tzLondon = IntlTimezone('Europe/London')
const tzTokyo = IntlTimezone('Asia/Tokyo')
const tzChicago = IntlTimezone('America/Chicago')

// Make the dates for 6:30am local time.
const dateTokyo = new DateTz(2000, 1, 1, 6, 30, tzTokyo)
const dateLondon = new DateTz(2000, 1, 1, 6, 30, tzLondon)
const dateChicago = new DateTz(2000, 1, 1, 6, 30, tzChicago)

// Show with toISOString.
console.log([
  dateTokyo.toISOString(),
  dateLondon.toISOString(),
  dateChicago.toISOString()
])
// (3) ['1999-12-31T21:30:00.000Z', '2000-01-01T06:30:00.000Z', '2000-01-01T12:30:00.000Z']

// The formatDate function also handles the timezone.
console.log([
  formatDate(dateTokyo, 'd-mmm-yy HH:MM p'),
  formatDate(dateLondon, 'd-mmm-yy HH:MM p'),
  formatDate(dateChicago, 'd-mmm-yy HH:MM p')
])
// (3) ['1-Jan-00 06:30 -09:00', '1-Jan-00 06:30 +00:00', '1-Jan-00 06:30 +06:00']
```

## What next ?

{@page ./design-choices.md}
