import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

const useDateFNSLocale = () => {
    const language = useSelector(state => state.language.current);
    const [locale, setLocale] = useState(undefined);
    const isMounted = useRef(null);

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
    
    return locale
}

export default useDateFNSLocale;
