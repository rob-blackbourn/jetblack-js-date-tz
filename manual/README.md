Timezone-aware date manipulation for JavaScript.

## Overview

This is a toolkit for working with dates and timezones.

JavaScript provides
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
as a standard built-in object. It represents the date as the number of
milliseconds since 1 January 1970 UTC, and provides methods to manipulate the
date in the local and UTC timezones.

This library provides two things:

* A timezone aware date-time class `DateTz`.
* Timezone aware convenience methods for manipulating dates.
* The ability to use IANA timezones (e.g. America/Chicago).

There are three ways to get IANA timezone information. The first is by using
the browser's `Intl.DateTimeFormat` function to print the time for a given zone
to a string, parse it, and subtract the result from UTC. This is very convenient
as all the information is already in the browser, however it can be slow.

The second two methods use the
[IANA timezone database](https://www.iana.org/time-zones)
has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically through an import, or dynamically through
an HTTP GET (e.g. with `fetch`).

## What Next ?

See {@page guide/getting-started.md}
