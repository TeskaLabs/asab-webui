import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigContainer from "./ConfigContainers/ConfigContainer";

import asabConfigReducer from './ConfigContainers/reducer';

import "./ConfigContainers/configuration.scss";

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		// Using redux to update items in Coniguration right after the change
		app.ReduxService.addReducer("asab_config", asabConfigReducer);

		app.Router.addRoute({
			path: "/config/:configType/:configName",
			exact: true,
			name: "Configuration",
			component: ConfigContainer,
			resource: "asab:config:access"
		});

		// Check presence of Maintenance item in sidebar
		let items = app.Navigation.getItems()?.items;
		let isMaintenancePresent = false;
		items.forEach(itm => {
			// If Maintenance present, then append Config as a Maintenance subitem
			if (itm?.name == "Maintenance") {
				itm.children.push({
					name: "Configuration",
					url: "/config/$/$",
					icon: "at-gear",
					resource: "asab:config:access"
				});
				isMaintenancePresent = true;
			}
		})

		// If Maintenance not present in sidebar navigation, add a Maintenance item
		if (!isMaintenancePresent) {
			app.Navigation.addItem({
				name: 'Maintenance',
				icon: "at-menu-square",
				children: [
					{
						name: "Configuration",
						url: "/config/$/$",
						icon: "at-gear",
						resource: "asab:config:access"
					}
				]
			});
		}
	}
}
