## Constructing Dates

The [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
class supports a few different ways of constructing a date, which imply the
timezone for which the date was built.

The current time `new Date()` is unambiguous as it is simply the number of milliseconds
since January 1st 1970 to now.

When a date is constructed with a string (e.g. `new Date("2000-01-01T00:00:00")`)
they are always relative to UTC, unless the timezone offset is explicitly specified. Conversely,
if the date components are passed as numbers (e.g. `new Date(2000, 6, 1)`) the
local timezone is used. To generate a date with date parts in UTC the
[`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)
function can be used.

Note that months start at 0 for January. To make this clear
this library calls them `monthIndex` (see {@page ./design-choices.md} for more
information).

The timezone objects used in this library have functions to construct dates
unambiguously.

```js
import { tzLocal, tzUtc, IntlTimezone } from '@jetblack/date'

const d1 = tzLocal.makeDate(2000, 6, 1)
const d2 = tzUtc.makeDate(2000, 0, 1, 12, 30)

const tzTokyo = new IntlTimezone('Asia/Tokyo')
const d3 = tzTokyo.makeDate(2000, 6, 1, 21, 0, 15, 250)
```

The {@linkcode parseDate} function constructs a date from a string and a given
format. If the timezone offset is not specified the supplied timezone is used.

```js
import { tzLocal, tzUtc, fetchTimezone, parseDate } from '@jetblack/date'

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
import { tzLocal } from '@jetblack/dates'

const date = new Date()
const { year, monthIndex, day} = tzLocal.dateParts(date)
const y = tzLocal.year(date)
const m = tzLocal.monthIndex(date)
const d = tzLocal.day(date)
```

For efficiency {@linkcode Timezone.dateParts | dateParts} should be used if more
than one part is required.

## Displaying Dates

The date class has several methods for displaying dates, all of which are either
specific to the local timezone or specific to UTC. These have little flexibility; the most
useful being [`toISOString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

The [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) provides more flexible options, and allows passing in the IANA timezone.

This library provides two means of displaying dates: {@linkcode Timezone.toISOString}
and {@linkcode formatDate}. The {@linkcode Timezone.toISOString} differs from
the built in method, in that it displays the date in the context of the provided
timezone, rather than the local timezone. The
{@linkcode formatDate} function is a typical pattern-style formatter.

The following demonstrates some of these functions.

```js
import { formatDate, IntlTimezone } from '@jetblack/date'

const tzLondon = IntlTimezone('Europe/London')
const tzTokyo = IntlTimezone('Asia/Tokyo')
const tzChicago = IntlTimezone('America/Chicago')

// Make the dates for 6:30am local time.
const dateTokyo = tzTokyo.makeDate(2000, 0, 1, 6, 30)
const dateLondon = tzLondon.makeDate(2000, 0, 1, 6, 30)
const dateChicago = tzChicago.makeDate(2000, 0, 1, 6, 30)

// Show with toISOString.
console.log([
  dateTokyo.toISOString(),
  dateLondon.toISOString(),
  dateChicago.toISOString()
])
// (3) ['1999-12-31T21:30:00.000Z', '2000-01-01T06:30:00.000Z', '2000-01-01T12:30:00.000Z']

// The Timezone.toISOString shows them relative to the local timezone.
console.log([
  tzTokyo.toISOString(dateTokyo),
  tzLondon.toISOString(dateLondon),
  tzChicago.toISOString(dateChicago)
])
// (3) ['2000-01-01T06:30:00+09:00', '2000-01-01T06:30:00+00:00', '2000-01-01T06:30:00-06:00']

// The formatDate function also handles the timezone.
console.log([
  formatDate(dateTokyo, 'd-mmm-yy HH:MM p', tzTokyo),
  formatDate(dateLondon, 'd-mmm-yy HH:MM p', tzLondon),
  formatDate(dateChicago, 'd-mmm-yy HH:MM p', tzChicago)
])
// (3) ['1-Jan-00 06:30 -09:00', '1-Jan-00 06:30 +00:00', '1-Jan-00 06:30 +06:00']
```

## What next ?

{@page ./design-choices.md}
