Calculations which work on  business days require calendars.

Two calendars are provided out of the box:

* [[WeekendCalendar]]
* [[HolidayCalendar]]

## WeekendCalendar

The weekend calendar takes an array of weekdays which it considers to always be
holiday dates. By default the weekdays are Saturday and Sunday, and a concrete
calendar is exported as [[calWeekends]]. This is the default calendar used by
business day functions.

## HolidayCalendar

The holiday calendar is built on top of the weekend calendar. As well as
weekends it takes a list of dates that are considered holidays.

Here is a simple calendar.

```js
import { HolidayCalendar, tzLocal } from '@jetblack/date'

const cal = new HolidayCalendar(
  'cal',
  [6, 0], // Saturday and Sunday
  [
    tzLocal.makeDate(2015, 0, 1),   // New Years Day
    tzLocal.makeDate(2015, 3, 3),   // Good Friday
    tzLocal.makeDate(2015, 3, 6),   // Easter Monday
    tzLocal.makeDate(2015, 4, 1),   // May Day
    tzLocal.makeDate(2015, 11, 25), // Christmas day
    tzLocal.makeDate(2015, 11, 26)  // Boxing day
  ],
  tzLocal
)
```

## Custom Calendars

You can make your own calendars. A common approach is to generate holidays from
rules. For example the first of January might always be a holiday, while the
death of a significant individual might have only been a holiday once.

The following abstract class provides a calendar which caches the holidays for a
year. Extending classes implement the `fetchHolidays(year: number, tz: Timezone)`
method, which returns a set of holidays for the year.

```ts
import { WeekendCalendar, Timezone, startOfDay, tzLocal } from "@jetblack/date"; 

export abstract class YearlyCalendar extends WeekendCalendar {

    private holidays: Map<number, Set<number>> = new Map()

    constructor (name: string, weekends: number[] = [0, 6]) {
        super(name, weekends)
    }

    public override isHoliday(date: Date, tz: Timezone = tzLocal): boolean {
        if (this.isWeekend(date, tz)) {
            return true
        }

        const year = tz.year(date)
        if (!this.holidays.has(year)) {
            this.holidays.set(year, this.fetchHolidays(year, tz))
        }

        const yearHolidays = this.holidays.get(year)
        return yearHolidays.has(startOfDay(date, tz).getTime())
    }

    protected abstract fetchHolidays(year: number, tz: Timezone): Set<number> 
}
```

With the above we create a rules based calendar. The following calendar is
a financial settlement calendar called "TARGET".

The holidays follow these rules:

* Saturdays.
* Sundays.
* New Year's Day, January 1st.
* Good Friday (since 2000).
* Easter Monday (since 2000).
* Labour Day, May 1st (since 2000).
* Christmas, December 25th.
* Day of Goodwill, December 26th (since 2000).
* December 31st (1998, 1999, and 2001).

```ts
export class Target extends YearlyCalendar {
    constructor() {
        super("TARGET", [6, 0]) // Saturdays, Sundays.
    }

    protected override fetchHolidays(year: number, tz: Timezone): Set<number> {
        const holidays: Set<number> = new Set()

        // New Year's Day, January 1st.
        holidays.add(tz.makeDate(year, 0, 1).getTime())

        if (year >= 2000) {
            const easterSunday = easter(year, tz)
            // Good Friday (since 2000).
            holidays.add(addDays(easterSunday, -2, tz).getTime())
            // Easter Monday (since 2000).
            holidays.add(addDays(easterSunday, 1, tz).getTime())
        }

        if (year >= 2000) {
            // Labour Day, May 1st (since 2000).
            holidays.add(tz.makeDate(year, 4, 1).getTime())
        }

        // Christmas Day, December 25th.
        holidays.add(tz.makeDate(year, 11, 25).getTime())

        if (year >= 2000) {
            // Day of Goodwill, December 26th (since 2000).
            holidays.add(tz.makeDate(year, 11, 26).getTime())
        }

        if (year === 1998 || year === 1999 || year === 2001) {
            // December 31st (1998, 1999, and 2001).
            holidays.add(tz.makeDate(year, 11, 31).getTime())
        }

        return holidays
    }
}
```
