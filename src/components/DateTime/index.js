import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import timeToString from './timeToString';
import useDateFNSLocale from './useDateFNSLocale';

export function DateTime(props) {
	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="datetime">{' '}</span>
		);
	}

	// Declaration of locale must be below span returned for `undefined` values to avoid bad react state handling in useDateFNSLocale
	const locale = useDateFNSLocale();

	if (new Date(props.value).toString() === "Invalid Date") {
		return (
			<span className='datetime'>
				<i className="cil-clock pr-1"></i>
				Invalid Date
			</span>
		);
	}

	const date = timeToString(props.value, props.dateTimeFormat);

	const dateFromNow = isNaN(props.value) ? formatDistanceToNow(parseISO(props.value), { addSuffix: true, locale: locale }) :
		props.value > 9999999999 ? formatDistanceToNow(props.value, { addSuffix: true, locale: locale }) :
		formatDistanceToNow(props.value * 1000, { addSuffix: true, locale: locale });

	return (
		<span className="datetime" title={dateFromNow}>
			<i className="cil-clock pr-1"></i>
			{date}
		</span>
	);
}
