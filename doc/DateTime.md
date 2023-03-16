# ASAB WebUI DateTime component

Displays a date & time in a local timezone.
It also displays the relative time in the hover/title.

## Example code

```javascript
import { DateTime } from 'asab-webui';
...

<DateTime value="2020-08-22T00:00:00+00:00" dateTimeFormat="long"/>
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
(Optional. The default format is `dateTimeFormat="medium"` -> `Nov 22, 2022, 1:13 PM`)

> - `dateTimeFormat="long"` is to add seconds to the time -> `Nov 22, 2022, 1:13:00 PM`.
> - `dateTimeFormat="iso"` is to add milliseconds to the time -> `2022-11-03T13:13:00+01:00`. 


# ASAB WebUI DateTime as a string

`DateTime as a string` is a method returning date and time as a simple string.

Acccepts 3 paramaters
    - value - `time` value
    - dateTimeFormat - format of the returned string, by default it is `medium`
    - renderType - `"string"` - this prop defines that the DateTime should be returned not as a component, but as a string

## Example code

```javascript
import { DateTime } from 'asab-webui';
...

const myFunction = (value) => {
    return DateTime({value: value, dateTimeFormat: "long", renderType: "string"});
}

...
```