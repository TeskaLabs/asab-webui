import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import timeToString from './timeToString';
import useDateFNSLocale from './useDateFNSLocale';

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

	const date = timeToString(props.value, props.dateTimeFormat);

	const dateFromNow = isNaN(props.value) ? formatDistanceToNow(parseISO(props.value), { locale: locale }) :
		props.value > 9999999999 ? formatDistanceToNow(props.value, { locale: locale }) :
		formatDistanceToNow(props.value * 1000, { locale: locale });

	return (
		<span className="datetime" title={dateFromNow}>
			<i className="cil-clock pr-1"></i>
			{date}
		</span>
	);
}
