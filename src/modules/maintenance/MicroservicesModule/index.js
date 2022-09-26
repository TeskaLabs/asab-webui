import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import MicroservicesContainer from "./MicroservicesContainers/MicroservicesContainer";
import MicroserviceDetailContainer from "./MicroservicesContainers/MicroserviceDetailContainer";

import "./MicroservicesContainers/microservices.scss";

export default class MicroservicesModule extends Module {
	constructor(app, name) {
		super(app, "ASABMicroservicesModule");

		app.Router.addRoute({
			path: "/microservices/svcs",
			exact: true,
			name: "Microservices",
			component: MicroservicesContainer,
		});

		app.Router.addRoute({
			path: "/microservices/svcs/:svc_name",
			exact: true,
			name: "Microservice",
			component: MicroserviceDetailContainer,
		})

		// Check presence of Maintenance item in sidebar
		let items = app.Navigation.getItems()?.items;
		let isMaintenancePresent = false;
		items.forEach(itm => {
			// If Maintenance present, then append Microservices as a Maintenance subitem
			if (itm?.name == "Maintenance") {
				itm.children.push({
					name: "Microservices",
					url: "/microservices/svcs",
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
						name: "Microservices",
						url: "/microservices/svcs",
						icon: "cil-list"
					}
				]
			});
		}
	}
}
