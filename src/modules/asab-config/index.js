import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigContainer from "./ConfigContainer";

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		this.App = app;
		this.Config = app.config;
		this.Navigation = app.Navigation;
		this.Router = app.Router;

		this.Router.addRoute({
			path: "/config",
			exact: true,
			name: "Configuration",
			component: ConfigContainer,
		});

		// TODO: add routes for types and configs

		this.Navigation.addItem({
			name: "Configuration",
			url: "/config",
			icon: 'cil-settings',
		});

	}
}
