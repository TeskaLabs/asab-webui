import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { HashRouter } from 'react-router-dom';

// SCSS
import './index.scss'

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
	table: {
		headers: [ 
			{ 
				name: 'Name',
				key: 'username',
				link: {
					pathname: '/pathname/',
					key: 'username'
				}
			},
			{ 
				name: 'Provider', 
				key: '_provider_id' 
			},
			{
				name: 'Type',
				key: '_type' 
			},
			{
				name: 'Date',
				key: '_c',
				datetime: { format: 'lll' }
			},
			{
				name: 'JSON',
				key: 'json',
				json: true
			},
		],
		limit: 10
	}
};

// Modules
const modules = [];

// Load custom modules
import HomeModule from './modules/home';

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
