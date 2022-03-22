import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';

export function TimeToString (props){
    const isMounted = useRef(null);
	const [locale, setLocale] = useState('');
	const language = useSelector(state => state.language.language)
	
	// Sets isMounted indicator to true
	// when component has been mounted (componentDidMount analogue)
	// and sets isMounted to false before component 
	// is unmounted (componentWillUnmount analogue)
	useEffect(() => {
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

	if ((props.value === null) || (props.value === undefined)) {
		return ' ';
	}

	if (new Date(props.value).toString() === "Invalid Date") {
		return 'Invalid Date';
	}
	
	const date = isNaN(props.value) ? format(parseISO(props.value), 'PPp', { locale: locale }) :
		props.value > 9999999999 ? format(props.value, 'PPp', { locale: locale }) :
		format(props.value * 1000, 'PPp', { locale: locale });

    return date
} 