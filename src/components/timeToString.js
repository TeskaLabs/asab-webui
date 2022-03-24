import { format, parseISO } from 'date-fns';

export const timeToString = (value) => {

	if ((value === null) || (value === undefined)) {
		return ' ';
	}
	
	if (new Date(value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}

	const date = isNaN(value) ? format(parseISO(value), 'PPp') :
					value > 9999999999 ? format(value, 'PPp') :
					format(value * 1000, 'PPp');
	return date;
}
