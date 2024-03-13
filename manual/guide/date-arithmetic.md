## Start of Day

The start of the day depends on where you are in the world. Functions
like {@linkcode startOfDay}, {@linkcode startOfMonth}, etc. all need to know
the timezone.

## Daylight Savings Time

Daylight savings time (DST) presents an issue for date arithmetic.

The following example demonstrates how daylight savings time is handled.

```js
import { tzUtc, fetchTimezone, addDays, addHours } from '@jetblack/date'

// In London on Sunday March 26 2000 the clocks went forward 1 hour at 1am.

// At midnight the clocks have yet to be put forward.
const tzLondon = await fetchTimezone('Europe/London')
const mar26 = tzLondon.makeDate(2000, 2, 26)
console.log(tzLondon.toISOString(mar26))
// 2000-03-26T00:00:00+00:00
console.log(tzUtc.toISOString(mar26))
// 2000-03-26T00:00:00.000Z

// Adding one hour from midnight takes the time to 2am as the clocks go forward
// one hour at 1am.
const mar26plus1h = addHours(mar26, 1)
console.log(tzLondon.toISOString(mar26plus1h))
// 2000-03-26T02:00:00+01:00
console.log(tzUtc.toISOString(mar26plus1h))
// 2000-03-26T01:00:00.000Z

// Add a day in the context of the London time zone.
const mar27 = addDays(mar26, 1, tzLondon)
console.log(tzLondon.toISOString(mar27))
// 2000-03-27T00:00:00+01:00
console.log(tzUtc.toISOString(mar27))
// 2000-03-26T23:00:00.000Z

// There were only 23 hours in the day of the 26th.
const millisInHour = 1000 * 60 * 60
const hours26to27 = (mar27.getTime() - mar26.getTime()) / millisInHour
console.log(hours26to27)
// 23
```

The London timezone is the same as UTC in the winter, but an hour ahead in the
summer. On the midnight of the day of the change London and UTC show the same
time. Adding an hour shows how the time leaps to 2am in London, but only 1am
in UTC. Adding a day and calculating the number of hours shows 23.

Keeping the time change constant (as with UTC) can be useful when plotting
data, or doing time series calculations (rolling averages, resampling, etc.).

## Date Schedules

When generating date schedules (with {@linkcode dateRangeByDay} for example),
the timezone is important both for the start of day, and for the daylight
savings change.

If what you really want is periods of constant milliseconds, you should use
tzUtc as it has no DST.

## What next ?

{@page ./timezones.md}
