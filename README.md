[![npm](https://img.shields.io/npm/v/@jetblack/date.svg)](https://www.npmjs.com/package/@jetblack/date) ![downloads](https://img.shields.io/npm/dt/@jetblack/date.svg) [![tests](https://github.com/rob-blackbourn/jetblack-js-date/workflows/Node.js%20tests/badge.svg)](https://github.com/rob-blackbourn/jetblack-js-date/actions)

# @jetblack/date

Timezone-aware date manipulation for JavaScript.

## Overview

This project provides utilities for working with dates and timezones.

The JavaScript built-in [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
object is a simple offset from an epoch. It provides functions
to resolve this into date components (days, months, years, etc.) in both the local
timezone of the browser, and UTC.

This library provides two things:

* Convenience methods for manipulating dates in both UTC and the local timezone.
* The ability to use IANA timezones (e.g. America/Chicago).

The
[IANA timezone database](https://www.iana.org/time-zones)
has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically, or dynamically through a HTTP GET (e.g. with `fetch`).

## Installation

The package can be installed from npmjs.

```bash
npm install --save @jetblack/date
```

## Convenience Methods

The library provides the usual convenience methods (e.g. `addDays`, `startOfDay`, etc.),
but with the addition of a timezone.

```js
import { startOfToday, tzLocal, tzUtc } from '@jetblack/date'

// Get the start of today relative to the local timezone.
const todayLocal = startOfToday()

// If the timezone isn't specified, it defaults to the local timezone.
// The following passes it explicitly.
const todayLocalExplicit = startOfToday(tzLocal)

// The start of today relative to UTC can be found by passing the UTC timezone.
const todayUTC = startOfToday(tzUtc)

// If the browser had timezone information the following would find the
// start of the day in Tokyo.
// const todayTokyo = startOfToday(tzTokyo)
```

The following describes how timezone data which is not natively supported by the
browser can be accessed and used.

### IANA Timezones

If the required timezones are known in advance they can be installed directly.
The IANA timezone database has been converted to JSON format and bundled into
an npm package. The following installs the package

```bash
npm install --save @jetblack/tzdata
```

Depending on the environment plugins you may be able to import the JSON directly.

```js
import { IANATimezone, dataToTimezoneOffset } from '@jetblack/date'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  // Convert the dates and durations from JSON strings to objects.
  BRUSSELS_TZDATA.map(dataToTimezoneOffset)
)

const newYearsDay = tzBrussels.makeDate(2000, 1, 1).toISOString()
// returns "2000-01-01T01:00:00Z"
```

When the required timezones are not known at build time they may be accessed dynamically.
The [jsdelivr](https://www.jsdelivr.com/) content delivery network
is capable of serving individual files from the
[@jetblack/tzdata](https://www.npmjs.com/package/@jetblack/tzdata) npm package.

The following example shows how this can be done using the minified version
of the data.

```js
import { IANATimezone, minDataToTimezoneOffset } from '@jetblack/date'

const timezoneName = 'Europe/Brussels'
fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.min.json`)
  .then(response => response.json())
  .then(data => {
    const zoneData = data.map(minDataToTimezoneOffset)
    const tzBrussels = new IANATimezone(timeZoneName, zoneData)
    const newYearsDay = tzBrussels.makeDate(2000, 0, 1)
    // returns "2000-01-01T01:00:00Z"
  })
  .catch(error => console.error(error))
}
```

The list of all available zones is provided at `dist/latest/zones.json`.

### Intl Timezones

Timezone offsets can be calculated by using Intl.DateTimeFormat. This may be slower
than fetching the database, but it is more convenient.

```js
import { IntlTimezone } from '@jetblack/date'

const tzBrussels = new IntlTimezone('Europe/Brussels')

const newYearsDay = tzBrussels.makeDate(2000, 1, 1).toISOString()
// returns "2000-01-01T01:00:00Z"
```
