import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { HashRouter } from 'react-router-dom';

// SCSS
import './index.scss'

// Configuration
const ConfigDefaults = {
};

// Modules
const modules = [];

import BrandingModule from './modules/branding';
modules.push(BrandingModule);

import HomeModule from './modules/home';
modules.push(HomeModule);

// Render
ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
