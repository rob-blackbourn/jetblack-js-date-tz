Most of the functions require a timezone, which if not passed defaults
to the local timezone.

The timezone takes over many of the duties of interacting with the built in
Date object, in the cases where timezone has an effect; for example in finding
the start of the day which may have a different UTC time for a given timezone.

The timezones implement {@linkcode Timezone}.

## Local Timezone

The local timezone is provided by the {@linkcode tzLocal} constant. The following will
create a new date for the first of January 2000 in the timezone of the browser.

```js
import { DateTz, tzLocal } from '@jetblack/date-tz'

let jan1 = new DateTz(2000, 1, 1, tzLocal)

// Equivalent to
jan1 = new Date(2000, 0, 1)
```

## UTC Timezone

The UTC timezone is provided by the `tzUtc` constant. The following will
create a new date for the first of January 2000 in the UTC timezone.

```js
import { DateTz, tzUtc } from '@jetblack/date-tz'

let jan1 = new DateTz(2000, 1, 1, tzUtc)

// Equivalent to
jan1 = new Date(Date.UTC(2000, 0, 1))
```

## Intl Timezone

Although the browser doesn't have direct access to a timezone
database, the information can be accessed indirectly by the Intl.DateTimeFormat
library. As each date must be individually formatted and parsed, this
approach may be slower than using a database.

The following creates a new date for the first of January 2000 in the
Europe/Brussels timezone.

```js
import { DateTz, IntlTimezone } from '@jetblack/date-tz'

const tzBrussels = new IntlTimezone('Europe/Brussels')

let jan1 = new DateTz(2000, 0, 1, tzBrussels)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 1 * 60 * 60 * 1000)
```

## IANA Timezone

For detail on IANA timezones see {@page ./iana-timezones.md}.

The following creates a new date for the first of January 2000 in the
Europe/Brussels timezone.

```js
import { DateTz, IANATimezone, dataToTimezoneOffset } from '@jetblack/date-tz'
import tzdataBrussels from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  tzdataBrussels.map(dataToTimezoneOffset)
)

let jan1 = new DateTz(2000, 1, 1, tzBrussels)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 1 * 60 * 60 * 1000)
```

## Other Methods

As well as making a date the timezone is used to get the date parts:
[[DateTz.year | `year`]], [[DateTz.month | `month`]],
[[DateTz.weekday | `weekday`]], [[DateTz.day | `day`]],
[DateTz.hours | `hours`], [[DateTz.minutes | `minutes`]],
[[DateTz.seconds | `seconds`]] and [[DateTz.milliseconds | `milliseconds`]].
A more general [[DateTz.parts | `parts`]] method can be used to get
multiple parts for efficiency.

An [[DateTz.offset | `offset`]] method is provided which accepts a date
argument and returns the offset from UTC in minutes.

Finally the [[DateTz.toISOString | `toISOString`]] method is provided to
display an ISO 8601 string with the timezone offset.

## What next ?

{@page ./iana-timezones.md}
