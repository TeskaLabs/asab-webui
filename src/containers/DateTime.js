import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

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
	const [locale, setLocale] = useState('');
	const language = useSelector(state => state.language.language)

	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="datetime">{' '}</span>
		)
	}

	useEffect(() => {
		if (language && language !== "en") {
			fetchLocale()
		} else {
			setLocale(undefined);
		}
	}, [language])

	const fetchLocale = async () => {
		// Don't remove comment inside import
		// it's webpack's dynamic expression
		const importedLocale = await import(
			/* webpackMode: "lazy", webpackChunkName: "df-[index]" */
			`date-fns/locale/${language}/index.js`
		);
		setLocale(importedLocale.default);
	}	


	const date = isNaN(props.value) ? format(parseISO(props.value), 'PPp', { locale: locale }) :
		props.value > 9999999999 ? format(props.value, 'PPp', { locale: locale }) :
		format(props.value * 1000, 'PPp', { locale: locale });

	return (
		<span className="datetime" title={m.fromNow()}>
			<i className="cil-clock pr-1"></i>
			{date}
		</span>
	)
}