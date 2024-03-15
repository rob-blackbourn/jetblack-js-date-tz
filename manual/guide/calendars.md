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
import { DateTz, HolidayCalendar, tzLocal } from '@jetblack/date-tz'

const cal = new HolidayCalendar(
  'cal',
  [6, 0], // Saturday and Sunday
  [
    new DateTz(2015, 0, 1, tzLocal),   // New Years Day
    new DateTz(2015, 3, 3, tzLocal),   // Good Friday
    new DateTz(2015, 3, 6, tzLocal),   // Easter Monday
    new DateTz(2015, 4, 1, tzLocal),   // May Day
    new DateTz(2015, 11, 25, tzLocal), // Christmas day
    new DateTz(2015, 11, 26, tzLocal)  // Boxing day
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
import { DateTz, WeekendCalendar, Timezone, startOfDay, tzLocal } from "@jetblack/date-tz"; 

export abstract class YearlyCalendar extends WeekendCalendar {

    private holidays: Map<number, Set<number>> = new Map()

    constructor (name: string, weekends: number[] = [0, 6]) {
        super(name, weekends)
    }

    public override isHoliday(date: DateTz): boolean {
        if (this.isWeekend(date)) {
            return true
        }

        const year = date.year
        if (!this.holidays.has(year)) {
            this.holidays.set(year, this.fetchHolidays(year, date.tz))
        }

        const yearHolidays = this.holidays.get(year)
        return yearHolidays.has(startOfDay(date).getTime())
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
        holidays.add(new DateTz(year, 1, 1, tz).getTime())

        if (year >= 2000) {
            const easterSunday = easter(year, tz)
            // Good Friday (since 2000).
            holidays.add(addDays(easterSunday, -2, tz).getTime())
            // Easter Monday (since 2000).
            holidays.add(addDays(easterSunday, 1, tz).getTime())
        }

        if (year >= 2000) {
            // Labour Day, May 1st (since 2000).
            holidays.add(new DateTz(year, 5, 1, tz).getTime())
        }

        // Christmas Day, December 25th.
        holidays.add(new DateTz(year, 12, 25, tz).getTime())

        if (year >= 2000) {
            // Day of Goodwill, December 26th (since 2000).
            holidays.add(new DateTz(year, 12, 26, tz).getTime())
        }

        if (year === 1998 || year === 1999 || year === 2001) {
            // December 31st (1998, 1999, and 2001).
            holidays.add(new DateTz(year, 12, 31, tz).getTime())
        }

        return holidays
    }
}
```
