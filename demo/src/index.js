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
	default_help_url: "https://github.com/TeskaLabs/asab-webui",
	table: {
		headers: [ 
			{ 
				name: 'Link',
				key: 'username',
				link: {
					pathname: '/pathname/',
					key: 'username'
				}
			},
			{
				name: 'DateTime',
				key: '_c',
				datetime: { format: 'lll' }
			},
			{ 
				name: 'Text', 
				key: '_provider_id' 
			},
			{
				name: 'Custom',
				customComponent: {
					generate: (obj) => (
						<div style={{ color: "red"}}>
							<p style={{ margin: 0}}>{obj.username}</p>
							<p style={{ margin: 0}}>{obj._type}</p>
						</div>
					),
					onDownload: (obj) => `${obj.username}/${obj._type}`
				}
			},
			{
				name: 'JSON',
				key: 'json',
				json: true
			},
			{
				name: ' ',
				actionButton: {
					title: "Actions",
					actions: [
						{
							name: "Show name",
							onClick(row, header) {
								alert(`Showing name: ${row.username}`)
							}
						}
					]
				}
			}
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
