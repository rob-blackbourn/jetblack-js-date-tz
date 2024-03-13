The internal representation of the JavaScript
[`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
class is the number of milliseconds since January 1, 1970, UTC. So in London on
this day, at midnight, the number of milliseconds was `0`, and at noon they were
43,200,000 (12 hours * 60 minutes * 60 seconds * 1000 milliseconds).

At that point in New York the sun was yet to rise as the time was 7am (as
sunrise was around 7:20am), as in the winter the city is 5 hours behind UTC.
At the same point in Tokyo the time was 9pm as the city is 9 hours ahead of UTC.

## Calculating

We can use the
[`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)
static method to calculate these dates.

If the time is 21:00 in Tokyo on January 1, 1970, and Tokyo is 9 hours ahead, we
get the following answer.

```js
> new Date(Date.UTC(1970, 0, 1, 21, 0, 0, 0) - 9*60*60*1000)
1970-01-01T12:00:00.000Z
```

This agrees with our previous workings.

## Timezone Database

Timezone offsets may change over time, and between seasons. For example in 2018
Morocco made daylight savings time (DST) apply to the whole year, while in 2019
Brazil scrapped DST. For countries that observe DST, the date and time on which
the adjustments are made also changes. There is a publicly available and
frequently updated database provided by [iana](https://www.iana.org/time-zones).

Given a timezone database and the time in UTC, we can calculate the time in a
given location. Unfortunately we can't always calculate the time in UTC from
local time, in periods where clocks have gone back. For example in 2023 in
London the clocks went back on the last Sunday in March at 2am. This means to
calculate the time in UTC from the local time between 1am and 2am we would need
to know if the adjustment had already been made.

## Using IANA Timezones With Date

Given that we know the `Date` object is a wrapper around the number of
milliseconds since 1970, and the IANA timezone is an offset in minutes from UTC,
we can see that adding the offset given from the UTC date and time will provide
the date we want.

The expensive part of this operation is finding the offset, as this is specific
to a given date and time. As this library uses the native `Date` this must be
done for each operation. To improve efficiency the {@linkcode Timezone} class has the
functions {@linkcode Timezone.makeDate | makeDate} and {@linkcode Timezone.dateParts | dateParts}. These functions do the offset lookup
once. Contrast this with getting the year ({@linkcode Timezone.year | tz.year(date)}) and then the month
({@linkcode Timezone.monthIndex | tz.monthIndex(date)}) which would need to find the offset twice.

## What next ?

{@page ./date-arithmetic.md}
