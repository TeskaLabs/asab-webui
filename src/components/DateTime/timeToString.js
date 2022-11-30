import { format, parseISO, formatISO } from 'date-fns';

const timeToString = (value, formatProp = "medium", locale = undefined) => {

	if ((value === null) || (value === undefined)) {
		return ' ';
	}
	
	if (new Date(value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}

	// const date = isNaN(value) ?
	// 	format(parseISO(value), (formatProp === "short") ? 'PPp' : (formatProp === "medium") ? 'PPpp' : 'PPp', { locale })
	// :
	// 	value > 9999999999 ?
	// 		format(value, (formatProp === "short") ? 'PPp' : (formatProp === "medium") ? 'PPpp' : 'PPp', { locale })
	// 	:
	// 		format(value * 1000, (formatProp === "short") ? 'PPp' : (formatProp === "medium") ? 'PPpp' : 'PPp', { locale });
	// return date;
	let date;

	if (isNaN(value)) {
		if (formatProp === "medium") {
			console.log(value, "val 1 medium")
			console.log(parseISO(value), "parseISO(value) val 1 medium")
			date = format(parseISO(value), 'PPp', { locale })
		} else if (formatProp === "long") {
			console.log(value, "val 1 long")
			date = format(parseISO(value), 'PPpp', { locale })
		} else if (formatProp === "iso") {
			console.log(value, "val iso 1")
			date = value
		}
	} else {
		if (value > 9999999999) {
			if (formatProp === "medium") {
				console.log(value, "val 2 medium")
				date = format(value, 'PPp', { locale })
			} else if (formatProp === "long") {
				console.log(value, "val 2 long")
				date = format(value, 'PPpp', { locale })
			} else if (formatProp === "iso") {
				console.log(value, "val iso 2")
				date = formatISO(value)
			}
		} else {
			if (formatProp === "medium") {
				console.log(value, "val 3 medium")
				date = format(value * 1000, 'PPp', { locale })
			} else if (formatProp === "long") {
				console.log(value, "val 3 long")
				date = format(value * 1000, 'PPpp', { locale })
			} else if (formatProp === "iso") {
				console.log(formatISO(value * 1000), "val 3 formiso")
				date = formatISO(value * 1000)
			}
		}
	}

	// console.log(format(value, "PPp"), "formatiso")
	return date;
}

export default timeToString;
