import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ToolsDashboard from "./ToolsDashboard";

export default class ToolsModule extends Module {
	constructor(app, name) {
		super(app, "ToolsModule");

		app.Router.addRoute({
			path: "/tools",
			exact: true,
			name: "Tools",
			component: ToolsDashboard,
			props: {
				type: "Tools"
			},
			resource: "asab:tools:access"
		});

		app.Navigation.addItem({
			name: "Tools",
			url: "/tools",
			icon: 'at-plugin',
			resource: "asab:tools:access"
		});
	}
}
