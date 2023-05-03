import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';
import { componentLoader } from 'asab-webui';
const ServicesContainer =  lazy(() => componentLoader(() => import("./ServicesContainers/ServicesContainer")));

import "./ServicesContainers/services.scss";

export default class ServicesModule extends Module {
	constructor(app, name) {
		super(app, "ASABServicesModule");

		app.Router.addRoute({
			path: "/services",
			exact: true,
			name: "Services",
			component: ServicesContainer,
			resource: "asab:service:access"
		});

		// Check presence of Maintenance item in sidebar
		let items = app.Navigation.getItems()?.items;
		let isMaintenancePresent = false;
		items.forEach(itm => {
			// If Maintenance present, then append Microservices as a Maintenance subitem
			if (itm?.name == "Maintenance") {
				itm.children.push({
					name: "Services",
					url: "/services",
					icon: "cil-list",
					resource: "asab:service:access"
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
						name: "Services",
						url: "/services",
						icon: "cil-list",
						resource: "asab:service:access"
					}
				]
			});
		}
	}
}
