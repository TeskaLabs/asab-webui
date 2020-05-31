import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { BrowserRouter } from 'react-router-dom';

// SCSS
import './index.scss'

const modules = [];

// Add TenantModule
import TenantModule from 'asab-webui/modules/tenant/module';
modules.push(TenantModule);

// Add custom oAuth Module
import MyOAuthModule from './modules/myoauthmodule';
modules.push(MyOAuthModule);

// Add custom module
import SampleModule from './modules/sample';
modules.push(SampleModule);

// Render
ReactDOM.render((
	<BrowserRouter>
		<Application modules={modules} />
	</BrowserRouter>
), document.getElementById('app'));
