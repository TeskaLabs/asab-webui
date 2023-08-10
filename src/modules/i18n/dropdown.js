import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CHANGE_LANGUAGE } from './actions';
import { useDispatch } from 'react-redux'


import {
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'reactstrap';


function LanguageDropdown(props) {

	const { t, i18n } = useTranslation();

	const changeLanguage = (language) => {
		i18n.changeLanguage(language).then(() => {
			// if the hard refresh is needed: window.location.reload(false);
		});
	}

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: CHANGE_LANGUAGE, language: i18n?.language ?? window.navigator.language })
	},[i18n.language])

	// This means that we basically don't know what languages are supported
	if ((i18n.options.supportedLngs == null) || (i18n.options.supportedLngs == false)) {
		return null;
	}

	return (
		<UncontrolledDropdown direction="down" className="pe-4">
			<DropdownToggle nav caret>
				<LanguageFlag language={i18n.language}/>
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem header>{t('i18n|Language')}</DropdownItem>

				{i18n.options.supportedLngs.map((language, i) => {
					if (language != 'cimode') return (
						<DropdownItem key={language} title={language} onClick={() => {changeLanguage(language)}}>
							<LanguageFlag language={language}/>
							{' '}
							{t('i18n|language|'+language)}
						</DropdownItem>
					);
					return null;
				})}

			</DropdownMenu>
		</UncontrolledDropdown>
	);
}

export default LanguageDropdown;

let LanguageToFlag = {
	cs: 'cz',
	en: 'gb',
	dev: 'placeholder',
	cimode: 'placeholder',
}

function LanguageFlag(props) {
	let lcls = LanguageToFlag[props.language];
	return (<img className={'pe-2'} src={`media/flags/${lcls}.svg`} style={{height: '1.2rem', width: '1.8rem'}}/>)
}
