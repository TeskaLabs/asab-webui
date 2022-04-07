import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

import useDateFNSLocale from './useDateFNSLocale';
import timeToString from './timeToString';

/*
Diplays a date & time in a local timezone.
It also display the relative time in the hover/title.

Usage:

import { DateTime } from 'asab-webui';
...

<DateTime value="2020-08-22T00:00:00+00:00"/>


The input `value` is in UTC and one of:

* Data() object (Javascript)
* "2020-08-22T00:00:00+00:00" String with ISO format of the day
* Number with Unix timestamp in seconds (max value is 9999999999)
* Number with timestamp in milliseconds (min value is 10000000000)

The date&time will be converted to a local timezone of the browser.


You may specify the format of the date&time, for details see https://momentjs.com.
The default format is `lll` -> `Aug 22, 2020 1:13 PM`

*/

export function DateTime(props) {
	const locale = useDateFNSLocale();

	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="datetime">{' '}</span>
		);
	}

	if (new Date(props.value).toString() === "Invalid Date") {
		return (
			<span className='datetime'>
				<i className="cil-clock pr-1"></i>
				Invalid Date
			</span>
		);
	}
	
	const date = timeToString(props.value, locale);

	const dateFromNow = isNaN(props.value) ? formatDistanceToNow(parseISO(props.value), { locale: locale }) :
		props.value > 9999999999 ? formatDistanceToNow(props.value, { locale: locale }) :
		formatDistanceToNow(props.value * 1000, { locale: locale });

	return (
		<span className="datetime" title={dateFromNow}>
			<i className="cil-clock pr-1"></i>
			{date}
		</span>
	)
}
