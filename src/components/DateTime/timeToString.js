import { format, parseISO } from 'date-fns';

const timeToString = (value, length = "short", locale = undefined) => {

	if ((value === null) || (value === undefined)) {
		return ' ';
	}
	
	if (new Date(value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}

	const date = isNaN(value) ?
		format(parseISO(value), (length === "short") ? 'PPp' : (length === "medium") ? 'PPpp' : 'PPp', { locale })
	:
		value > 9999999999 ?
			format(value, (length === "short") ? 'PPp' : (length === "medium") ? 'PPpp' : 'PPp', { locale })
		:
			format(value * 1000, (length === "short") ? 'PPp' : (length === "medium") ? 'PPpp' : 'PPp', { locale });
	return date;
}

export default timeToString;
