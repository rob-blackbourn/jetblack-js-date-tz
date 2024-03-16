The [[DateTz]] class requires a timezone, which if not passed defaults
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

## IANA Timezone

There are three ways to get IANA timezone information. 

The second two methods use the
[IANA timezone database](https://www.iana.org/time-zones)
that has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically through an import, or dynamically through
an HTTP GET (e.g. with `fetch`).

# Intl vs Static vs Dynamic

## Intl

The [[IntlTimezone]] class uses the browser's `Intl.DateTimeFormat` function to print the time for a given zone
to a string, parse it, and subtract the result from UTC. This is very convenient
as all the information is already in the browser, however it can be slow.

```js
import { DateTz, IntlTimezone } from '@jetblack/date-tz'

const tzBrussels = new IntlTimezone('Europe/Brussels')

let jan1 = new DateTz(2000, 1, 1, tzBrussels)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 1 * 60 * 60 * 1000)
```

## Static

If the required timezones are known in advance they can be installed directly.
The IANA timezone database has been converted to JSON format and bundled into
an npm package. The following installs the package

```bash
npm install --save @jetblack/tzdata
```

Depending on the environment plugins you may be able to import the JSON directly.

```js
import { DateTz, IANATimezone, dataToTimezoneOffset } from '@jetblack/date-tz'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  // Convert the dates and durations from JSON strings to objects.
  BRUSSELS_TZDATA.map(dataToTimezoneOffset)
)

const newYearsDay = new DateTz(2000, 1, 1, tzBrussels).toISOString()
// returns "2000-01-01T01:00:00Z"
```

This library used to have a couple of helper functions for this.
Unfortunately the cause webpack warnings because of the dynamic import,
so they were removed. However you can add these to you projects.

The following loads the time zone names.

In typescript:

```ts
export async function loadTimezoneNames(
  version: string = 'latest'
): Promise<string[]> {
  const path = `@jetblack/tzdata/dist/${version}/zones.json`
  const { default: names } = await import(path)
  return names
}
```

In javascript:

```js
export async function loadTimezoneNames(version = 'latest') {
  const path = `@jetblack/tzdata/dist/${version}/zones.json`
  const { default: names } = await import(path)
  return names
}
```

The following loads a timezone.

In typescript:

```ts
export async function loadTimezone(
  name: string,
  version: string = 'latest'
): Promise<IANATimezone> {
  const path = `@jetblack/tzdata/dist/${version}/${name}.min.json`
  const { default: tzData } = await import(path)
  return new IANATimezone(name, tzData.map(minDataToTimezoneOffset))
}
```

In JavaScript:

```js
export async function loadTimezone(name, version = 'latest') {
  const path = `@jetblack/tzdata/dist/${version}/${name}.min.json`
  const { default: tzData } = await import(path)
  return new IANATimezone(name, tzData.map(minDataToTimezoneOffset))
}
```

You can use these as follows.

```js
import { loadTimezone } from '@jetblack/date-tz'

const tzChicago = await loadTimezone('America/Chicago')
console.log(tzChicago.makeDate(2022, 12, 25).toISOString())
// 2023-01-25T06:00:00.000Z
```

## Dynamic

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
    const newYearsDay = new DateTz(2000, 1, 1, tzBrussels)
    // returns "2000-01-01T01:00:00Z"
  })
  .catch(error => console.error(error))
}
```

There is a utility function [[`fetchTimezone`]] which wraps this up.

```js
import { fetchTimezone } from '@jetblack/date-tz'

const tzChicago = await fetchTimezone('America/Chicago')
console.log(new Date(2022, 12, 25, tzChicago).toISOString())
// 2023-01-25T06:00:00.000Z
```

The list of all available zones is provided at `dist/latest/zones.json`.

## What next ?

{@page ./calendars.md}
