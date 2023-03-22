import { format, parseISO, formatISO } from 'date-fns';
import useDateFNSLocale from './useDateFNSLocale';

const timeToString = (value, dateTimeFormat = "medium") => {

	if ((value === null) || (value === undefined)) {
		return ' ';
	}
	
	// Declaration of locale must be below empty string returned for `undefined` values to avoid bad react state handling in useDateFNSLocale
	const locale = useDateFNSLocale();
	
	if (new Date(value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}

	let date;

	if (isNaN(value) == true) {
		if (dateTimeFormat === "medium") {
			date = format(parseISO(value), 'PPp', { locale });
		} else if (dateTimeFormat === "long") {
			date = format(parseISO(value), 'PPpp', { locale });
		} else if (dateTimeFormat === "iso") {
			date = formatISO(parseISO(value));
		}
	} else {
		if (value > 9999999999) {
			if (dateTimeFormat === "medium") {
				date = format(value, 'PPp', { locale });
			} else if (dateTimeFormat === "long") {
				date = format(value, 'PPpp', { locale });
			} else if (dateTimeFormat === "iso") {
				date = formatISO(value);
			}
		} else {
			if (dateTimeFormat === "medium") {
				date = format(value * 1000, 'PPp', { locale });
			} else if (dateTimeFormat === "long") {
				date = format(value * 1000, 'PPpp', { locale });
			} else if (dateTimeFormat === "iso") {
				date = formatISO(value * 1000);
			}
		}
	}

	return date;
}

export default timeToString;
