The design choices are centered around ease of use, rather than
compatibility, and browser bundling.

### Months

The DateTz object treats `1` as the first month of the year, rather than `0` for the built in Date class.

### Day of Week

The Date object treats `0` as Sunday, and this library accepts that convention.
This means functions like [[startOfWeek]] will return Sunday rather than Monday.

### No Unnecessary Functions

The [[addDays]] function has no complimentary `subDays` function, as this can
be achieved by making the `days` argument negative.

### Prefer Functions to Classes

While classes might provide a more elegant interface, few tree shaking libraries
and able to prune unused class methods, so functions are preferred to classes.

### Provide Unminified Bundle

This may change, but the current view is that the majority of developers
use bundlers, rather than include manual `<script>` tags. With this in
mind the code is provided as a single javascript file, as the downstream
bundler will do the tree shaking.

## What next ?

{@page ./calculations.md}
