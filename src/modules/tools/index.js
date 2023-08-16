import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';
import { componentLoader } from 'asab-webui';
const ToolsDashboard = lazy(() => componentLoader(() => import("./ToolsDashboard")));

import "./tools.scss"

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
			icon: 'cil-puzzle',
			resource: "asab:tools:access"
		});
	}
}
