import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';
import { componentLoader } from 'asab-webui';
const AboutScreen = lazy(() => componentLoader(() => import('./AboutScreen')));

import "./styles.scss";

export default class AboutModule extends Module {
	constructor(app, name) {
		super(app, "AboutModule");

		app.Router.addRoute({
			path: "/about",
			exact: true,
			name: "About",
			component: AboutScreen,
		});

		app.Navigation.addItem({
			name: "About",
			url: "/about",
			icon: "cil-info",
			order: 9999
		});
	}
}
