import React from 'react';
import { useTranslation } from 'react-i18next';


import {
	UncontrolledDropdown,
	Dropdown,
	DropdownItem,
	DropdownMenu, 
	DropdownToggle,
	Nav, NavItem, NavLink
} from 'reactstrap';

import {
	AppAsideToggler,
	AppHeaderDropdown,
	AppNavbarBrand,
	AppSidebarToggler
} from '@coreui/react';


function LanguageDropdown(props) {

	const { t, i18n } = useTranslation();

	const changeLanguage = (language) => {
		i18n.changeLanguage(language).then(() => {
			// if the hard refresh is needed: window.location.reload(false);
		});
	}

	// This means that we basically don't know what languages are supported
	if ((i18n.options.supportedLngs == null) || (i18n.options.supportedLngs == false)) {
		return null;
	}

	return (
		<UncontrolledDropdown direction="down" className="pr-3">
			<DropdownToggle nav caret>
				<LanguageFlag language={i18n.language}/>
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem header>Language</DropdownItem>

				{i18n.options.supportedLngs.map((language, i) => {
					if (language != 'cimode') return (
						<DropdownItem key={language} title={language} onClick={() => {changeLanguage(language)}}>
							<LanguageFlag language={language}/>
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
	cs: 'cif-cz',
	en: 'cif-gb',
	dev: 'cil-bug',
	cimode: 'cil-bug',
}

function LanguageFlag(props) {
	let lcls = LanguageToFlag[props.language]
	return (<i className={lcls +' pr-2'} style={{height: '1em'}}></i>)
}
