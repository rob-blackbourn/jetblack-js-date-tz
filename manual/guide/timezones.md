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
import { tzLocal } from '@jetblack/date'

let jan1 = tzLocal.makeDate(2000, 0, 1)

// Equivalent to
jan1 = new Date(2000, 0, 1)
```

## UTC Timezone

The UTC timezone is provided by the `tzUtc` constant. The following will
create a new date for the first of January 2000 in the UTC timezone.

```js
import { tzUtc } from '@jetblack/date'

let jan1 = tzUtc.makeDate(2000, 0, 1)

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
import { IntlTimezone } from '@jetblack/date'

const tzBrussels = new IntlTimezone('Europe/Brussels')

let jan1 = tzBrussels.makeDate(2000, 0, 1)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 1 * 60 * 60 * 1000)
```

## IANA Timezone

For detail on IANA timezones see {@page ./iana-timezones.md}.

The following creates a new date for the first of January 2000 in the
Europe/Brussels timezone.

```js
import { IANATimezone, dataToTimezoneOffset } from '@jetblack/date'
import tzdataBrussels from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  tzdataBrussels.map(dataToTimezoneOffset)
)

let jan1 = tzBrussels.makeDate(2000, 0, 1)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 1 * 60 * 60 * 1000)
```

## Other Methods

As well as making a date the timezone can be used to get the date parts:
[[Timezone.year | `year`]], [[Timezone.monthIndex | `monthIndex`]],
[[Timezone.weekday | `weekday`]], [[Timezone.day | `day`]],
[Timezone.hours | `hours`], [[Timezone.minutes | `minutes`]],
[[Timezone.seconds | `seconds`]] and [[Timezone.milliseconds | `milliseconds`]].
A more general [[Timezone.dateParts | `dateparts`]] method can be used to get
multiple parts for efficiency.

An [[Timezone.offset | `offset`]] method is provided which accepts a date
argument and returns the offset from UTC in minutes.

Finally the [[Timezone.toISOString | `toISOString`]] method is provided to
display an ISO 8601 string with the timezone offset.

## What next ?

{@page ./iana-timezones.md}
