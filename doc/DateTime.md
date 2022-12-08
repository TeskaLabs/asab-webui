# ASAB WebUI DateTime component

Displays a date & time in a local timezone.
It also displays the relative time in the hover/title.

## Example code

```javascript
import { DateTime } from 'asab-webui';
...

<DateTime value="2020-08-22T00:00:00+00:00" length="medium"/>

```

The input `value` is in UTC and one of:

* Data() object (Javascript)
* "2020-08-22T00:00:00+00:00" String with ISO format of the day
* Number with Unix timestamp in seconds (max value is 9999999999)
* Number with timestamp in milliseconds (min value is 10000000000)

The date&time will be converted to a local timezone of the browser.


You may specify the format of the date&time, for details see https://momentjs.com.
The default format is `lll` -> `Aug 22, 2020 1:13 PM`


### Optional prop
The prop `dateTimeFormat` specify length of the time.
(Optional. The default format is -> `dateTimeFormat="madium`)

> - `dateTimeFormat="long` is to add seconds to the time. The time will have this format: `Nov 22, 2022, 1:13:00 PM`.
> - `dateTimeFormat="iso` is to add milliseconds to the time. The time will have this format: `2022-11-03T13:13:00+01:00`. 


# ASAB WebUI timeToString method

`timeToString` is a method returning date and time as a simple string in a format based on passed `lang` parameter. 
Acccepts 2 paramaters
    - timestamp - in seconds or miliseconds
    - language object (coming from `useDateFNSLocale()`) of selected locale - default `undefined` shows `en` format (e.g. `'Apr 11, 2022, 1:16 PM'`)

## Example code

```javascript
import { timeToString, useDateFNSLocale } from 'asab-webui';
...

const myFunction = (time) => {
    const lang = useDateFNSLocale();
    let timestring = timeToString(time, lang);
    
    return timestring;
}

```