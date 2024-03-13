# Static vs Dynamic

## Static

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

const newYearsDay = tzBrussels.makeDate(2000, 0, 1).toISOString()
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
import { loadTimezone } from '@jetblack/date'

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

There is a utility function [[`fetchTimezone`]] which wraps this up.

```js
import { fetchTimezone } from '@jetblack/date'

const tzChicago = await fetchTimezone('America/Chicago')
console.log(tzChicago.makeDate(2022, 12, 25).toISOString())
// 2023-01-25T06:00:00.000Z
```

The list of all available zones is provided at `dist/latest/zones.json`.

## What next ?

{@page ./calendars.md}
