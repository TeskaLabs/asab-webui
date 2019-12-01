import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui-kit-lite';

// SCSS
import './index.scss'

const modules = [];

// Add TenantModule
import TenantModule from 'asab-webui-kit-lite/modules/tenant/module';
modules.push(TenantModule);

// Add custom module 
import SampleModule from './modules/sample';
modules.push(SampleModule);

// Render
ReactDOM.render((
	<Application modules={modules} />
), document.getElementById('app'));
