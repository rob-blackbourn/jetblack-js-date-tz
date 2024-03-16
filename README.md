[![npm](https://img.shields.io/npm/v/@jetblack/date-tz.svg)](https://www.npmjs.com/package/@jetblack/date-tz) ![downloads](https://img.shields.io/npm/dt/@jetblack/date-tz.svg) [![tests](https://github.com/rob-blackbourn/jetblack-js-date-tz/workflows/Node.js%20tests/badge.svg)](https://github.com/rob-blackbourn/jetblack-js-date-tz/actions)

# @jetblack/date-tz

Timezone-aware date manipulation for JavaScript.

## Overview

This is a toolkit for working with dates and timezones.

This library provides:

* A timezone aware date-time class [[DateTz]].
* Timezone aware convenience methods for manipulating dates.
* The ability to use IANA timezones (e.g. America/Chicago).

## Installation

The package can be installed from npmjs.

```bash
npm install --save @jetblack/date-tz
```

## Usage

The library provides the usual convenience methods (e.g. `addDays`, `startOfDay`, etc.),
but with the addition of a timezone.

```js
import { DateTz, startOfDay, tzLocal, tzUtc } from '@jetblack/date-tz'

// Get the start of today relative to the local timezone.
const todayLocal = startOfDay(new DateTz())

// If the timezone isn't specified, it defaults to the local timezone.
// The following passes it explicitly.
const todayLocalExplicit = startOfDay(new DateTz(tzLocal))

// The start of today relative to UTC can be found by passing the UTC timezone.
const todayUTC = startOfDay(new DateTz(tzUtc))

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
import { IANATimezone, dataToTimezoneOffset } from '@jetblack/date-tz'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  // Convert the dates and durations from JSON strings to objects.
  BRUSSELS_TZDATA.map(dataToTimezoneOffset)
)

const newYearsDay = new DateTz(2000, 1, 1, tzBrussels).toISOString()
// returns "2000-01-01T01:00:00Z"
```

When the required timezones are not known at build time they may be accessed dynamically.
The [jsdelivr](https://www.jsdelivr.com/) content delivery network
is capable of serving individual files from the
[@jetblack/tzdata](https://www.npmjs.com/package/@jetblack/tzdata) npm package.

The following example shows how this can be done using the minified version
of the data.

```js
import { IANATimezone, minDataToTimezoneOffset } from '@jetblack/date-tz'

const timezoneName = 'Europe/Brussels'
fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.min.json`)
  .then(response => response.json())
  .then(data => {
    const zoneData = data.map(minDataToTimezoneOffset)
    const tzBrussels = new IANATimezone(timeZoneName, zoneData)
    const newYearsDay = new DateTz(2000, 0, 1, tzBrussels)
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
import { DateTz, IntlTimezone } from '@jetblack/date-tz'

const tzBrussels = new IntlTimezone('Europe/Brussels')

const newYearsDay = new DateTz(2000, 1, 1, tzBrussels).toISOString()
// returns "2000-01-01T01:00:00Z"
```
