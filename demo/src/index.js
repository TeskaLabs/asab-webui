import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { HashRouter } from 'react-router-dom';

// Configuration
let ConfigDefaults = {
	title: "ASAB App",
	brandImage: {
		light: {
			full: "media/logo/header-logo-full.svg",
			minimized: "media/logo/header-logo-minimized.svg"
		},
		dark: {
			full: "media/logo/header-logo-full-dark.svg",
			minimized: "media/logo/header-logo-minimized-dark.svg"
		}
    },
	sidebarLogo: {
		light: {
			full: "media/logo/sidebar-logo-full.svg",
			minimized: "media/logo/sidebar-logo-minimized.svg"
		},
		dark: {
			full: "media/logo/sidebar-logo-full-dark.svg",
			minimized: "media/logo/sidebar-logo-minimized-dark.svg"
		}
	},
	default_help_url: "https://github.com/TeskaLabs/asab-webui",
	i18n: {
		fallbackLng: 'en',
		supportedLngs: ['en', 'cs'],
		debug: false,
	},
	sidebarItemsOrder: ["Table", "Home"]
};

// Modules
const modules = [];

// Load custom modules
import HomeModule from './modules/home';

// Load default modules
import I18nModule from 'asab-webui/modules/i18n';
modules.push(I18nModule);

if (__CONFIG__.modules !== null) {
	Object.values(__CONFIG__.modules).map((module_name) => {
		switch(module_name) {
			case "HomeModule": modules.push(HomeModule); break;
		}
	});
}

// Render
ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
