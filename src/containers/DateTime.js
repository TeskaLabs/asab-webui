import React, { Component } from 'react'
import moment from "moment";

/*
Diplays a date & time in a local timezone.
It also display the relative time in the hover/title.

Usage:

<DateTime value="2020-08-22T00:00:00+00:00"/>


The input `value` is in UTC and one of:

* Data() object (Javascript)
* "2020-08-22T00:00:00+00:00" String with ISO format of the day
* Number with Unix timestamp

The date&time will be converted to a local timezone of the browser.


You may specify the format of the date&time, for details see https://momentjs.com.
The default format is `lll` -> `Aug 22, 2020 1:13 PM`

*/

export function DateTime(props) {

	let m = null;
	if (isNaN(props.value)) {
		m = moment(props.value);
	} else {
		m = moment(props.value * 1000.0);
	}

	return (
		<span className="datetime" title={m.fromNow()}>
			<i className="cil-clock"></i>
			{m.format(props.format || 'lll')}
		</span>
	)
}
