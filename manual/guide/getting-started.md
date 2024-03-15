## Installation

The package can be installed from [npmjs](https://www.npmjs.com/package/@jetblack/date-tz).

```bash
npm install --save @jetblack/date-tz
```

## Convenience Methods

The library provides the usual convenience methods (e.g. [[addDays]], [[startOfDay]], etc.),
but with the addition of a timezone where necessary.

```js
import { DateTz, startOfToday, tzLocal, tzUtc, fetchTimezone, IntlTimezone } from '@jetblack/date-tz'

// Make a time in the UTC timezone
const unixEpoch = new DateTz(1970, 1, 1, tzUtc)

// Get the start of today relative to the local timezone.
const todayLocal = startOfToday()

// If the timezone isn't specified, it defaults to the local timezone.
// The following passes it explicitly.
const todayLocalExplicit = startOfToday(tzLocal)

// The start of today relative to UTC can be found by passing the UTC timezone.
const todayUTC = startOfToday(tzUtc)

// The start of the day in Tokyo, using Intl.DateTimeFormat time zone information.
const tzChicago = new IntlTimezone('America/Chicago')
const todayChicago = startOfToday(tzChicago)

// The start of the day in Tokyo, using IANA time zone information.
const tzTokyo = await fetchTimezone('Asia/Tokyo')
const todayTokyo = startOfToday(tzTokyo)
```

## What next ?

{@page ./general-usage.md}
