import Module from '../../abc/Module';

import AboutScreen from './AboutScreen';

export default class AboutModule extends Module {
	constructor(app, name) {
		super(app, "AboutModule");
		this.App = app;

		app.Router.addRoute({
			path: "/about",
			exact: true,
			name: "About",
			component: AboutScreen,
		});

		// app.Navigation.addItem({
		// 	name: "About ",
		// 	url: "/about",
		// 	icon: "cil-info icons",
		// });
	}
}
