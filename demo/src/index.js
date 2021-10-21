import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { HashRouter } from 'react-router-dom';

// Configuration
let ConfigDefaults = {
	title: "ASAB App",
	brand_image: {
		full: "media/logo/header-full.svg",
		minimized: "media/logo/header-minimized.svg",
	},
	footer_image: {
		src: "media/logo/footer.svg",
		alt: "Created by TeskaLabs",
		href: "https://teskalabs.com/",
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
