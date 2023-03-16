import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import useDateFNSLocale from './useDateFNSLocale';
import timeToString from './timeToString';

export function DateTime(props) {
	const locale = useDateFNSLocale();

	if ((props.value === null) || (props.value === undefined)) {
		switch(props.renderType) {
			case "string": return " ";
			default: return (
				<span className="datetime">{' '}</span>
			);
		}
	}

	if (new Date(props.value).toString() === "Invalid Date") {
		switch(props.renderType) {
			case "string": return "Invalid Date";
			default: return (
				<span className='datetime'>
					<i className="cil-clock pr-1"></i>
					Invalid Date
				</span>
			);
		}
	}

	const date = timeToString(props.value, props.dateTimeFormat, locale);

	const dateFromNow = isNaN(props.value) ? formatDistanceToNow(parseISO(props.value), { locale: locale }) :
		props.value > 9999999999 ? formatDistanceToNow(props.value, { locale: locale }) :
		formatDistanceToNow(props.value * 1000, { locale: locale });

	switch(props.renderType) {
		case "string": return date;
		default: return (
			<span className="datetime" title={dateFromNow}>
				<i className="cil-clock pr-1"></i>
				{date}
			</span>
		);
	}
}
