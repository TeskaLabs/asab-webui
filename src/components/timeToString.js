import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

export const timeToString = (value) => {
    const isMounted = useRef(null);
	const [locale, setLocale] = useState('');
	const language = useSelector(state => state.language.language)
	
	// Sets isMounted indicator to true
	// when component has been mounted (componentDidMount analogue)
	// and sets isMounted to false before component 
	// is unmounted (componentWillUnmount analogue)
	useEffect(() => {
		console.log(value)
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		}
	}, [])

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
		if (isMounted.current === true) setLocale(importedLocale.default);
	}

	if ((value === null) || (value === undefined)) {
		return ' ';
	}

	if (new Date(value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}
	
	const date = isNaN(value) ? format(parseISO(value), 'PPp', { locale: locale }) :
		value > 9999999999 ? format(value, 'PPp', { locale: locale }) :
        format(value * 1000, 'PPp', { locale: locale });
        
	return date
} 