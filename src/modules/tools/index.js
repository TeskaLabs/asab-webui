import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ToolsDashboard from "./ToolsDashboard";

export default class ToolsModule extends Module {
	constructor(app, name) {
		super(app, "ToolsModule");
		this.App = app;
		this.Config = app.config;
		this.Navigation = app.Navigation;
		this.Router = app.Router;


		this.Router.addRoute({
			path: "/tools",
			exact: true,
			name: "Tools",
			component: ToolsDashboard,
		});

		this.Navigation.addItem({
			name: "Tools",
			url: "/tools",
			icon: 'cil-puzzle',
		});
	}
}
