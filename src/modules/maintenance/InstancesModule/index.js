import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import InstancesContainer from "./InstancesContainers/InstancesContainer";

import "./InstancesContainers/instances.scss";

export default class InstancesModule extends Module {
	constructor(app, name) {
		super(app, "ASABInstancesModule");

		app.Router.addRoute({
			path: "/instances",
			exact: true,
			name: "Instances",
			component: InstancesContainer,
		});

		// Check presence of Maintenance item in sidebar
		let items = app.Navigation.getItems()?.items;
		let isMaintenancePresent = false;
		items.forEach(itm => {
			// If Maintenance present, then append Microservices as a Maintenance subitem
			if (itm?.name == "Maintenance") {
				itm.children.push({
					name: "Instances",
					url: "/instances",
					icon: "cil-list"
				});
				isMaintenancePresent = true;
			}
		})

		// If Maintenance not present in sidebar navigation, add a Maintenance item
		if (!isMaintenancePresent) {
			app.Navigation.addItem({
				name: 'Maintenance',
				icon: "cil-apps-settings",
				children: [
					{
						name: "Instances",
						url: "/instances",
						icon: "cil-list"
					}
				]
			});
		}
	}
}
