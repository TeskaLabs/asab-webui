import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigDashboard from "./ConfigDashboard";

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
			component: ConfigDashboard,
		});

		this.Navigation.addItem({
			name: "Configuration",
			url: "/config",
			icon: 'cil-settings',
		});
	}
}
