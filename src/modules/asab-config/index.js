import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigContainer from "./ConfigContainer";
import MicroservicesContainer from "./MicroservicesContainer";
import AboutScreen from '../about/AboutScreen';

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		this.App = app;
		this.Config = app.config;
		this.Navigation = app.Navigation;
		this.Router = app.Router;

		this.Router.addRoute({
			path: "/config/:configType/:configName",
			exact: true,
			name: "Configuration",
			component: ConfigContainer,
		});

		this.Router.addRoute({
			path: "/config/microservices",
			exact: true,
			name: "Microservices",
			component: MicroservicesContainer,
		});

		this.Router.addRoute({
			path: "/about",
			exact: true,
			name: "About",
			component: AboutScreen,
		});

		this.Navigation.addItem({
			name: 'Maintenance',
			icon: 'cil-apps-settings',
			children: [
				{
					name: "Configuration",
					url: "/config/$/$",
					icon: 'cil-settings',
				},
				{
					name: "Microservices",
					url: "/config/microservices",
					icon: 'cil-list',
				},
				{
					name: "About",
					url: "/about",
					icon: 'cil-info',
				},
			]
		});

	}
}
