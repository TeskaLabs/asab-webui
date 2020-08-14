import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { HashRouter } from 'react-router-dom';

// SCSS
import './index.scss'

const modules = [];

// Add custom module
import SampleModule from './modules/sample';
modules.push(SampleModule);

// Render
ReactDOM.render((
	<HashRouter>
		<Application modules={modules} />
	</HashRouter>
), document.getElementById('app'));
