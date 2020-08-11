import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from 'asab-webui';
import { BrowserRouter } from 'react-router-dom';

// SCSS
import './index.scss'

const modules = [];

// Add custom module
import SampleModule from './modules/sample';
modules.push(SampleModule);

// Render
ReactDOM.render((
	<BrowserRouter>
		<Application modules={modules} />
	</BrowserRouter>
), document.getElementById('app'));
