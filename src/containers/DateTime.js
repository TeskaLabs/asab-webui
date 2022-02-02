import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

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

	const language = useSelector(state => state.language.language)

	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="datetime">{' '}</span>
		)
	}

	const m = isNaN(props.value) || props.value > 9999999999 ? moment(props.value) : moment(props.value * 1000);
	m.locale(language.slice(0, 2));


	return (
		<span className="datetime" title={m.fromNow()}>
			<i className="cil-clock pr-1"></i>
			{m.format(props.format || 'lll')}
		</span>
	)
}