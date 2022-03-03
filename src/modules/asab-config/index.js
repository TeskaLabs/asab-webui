import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigContainer from "./ConfigContainers/ConfigContainer";
import MicroservicesContainer from "./MicroservicesContainers/MicroservicesContainer";
import MicroserviceDetailContainer from "./MicroservicesContainers/MicroserviceDetailContainer";

import asabConfigReducer from './ConfigContainers/reducer';

import "./ConfigContainers/configuration.css";

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		app.ReduxService.addReducer("asab_config", asabConfigReducer);


		app.Router.addRoute({
			path: "/config/svcs",
			exact: true,
			name: "Microservices",
			component: MicroservicesContainer,
		});

		app.Router.addRoute({
			path: "/config/svcs/:svc_name",
			exact: true,
			name: "Microservice",
			component: MicroserviceDetailContainer,
		})

		app.Router.addRoute({
			path: "/config/:configType/:configName",
			exact: true,
			name: "Configuration",
			component: ConfigContainer,
		});

		app.Navigation.addItem({
			name: "Configuration",
			url: "/config/$/$",
			icon: "cil-settings"
		});

		app.Navigation.addItem({
			name: 'Maintenance',
			icon: "cil-apps-settings",
			children: [
				{
					name: "Microservices",
					url: "/config/svcs",
					icon: "cil-list"
				}
			]
		});
	}
}
