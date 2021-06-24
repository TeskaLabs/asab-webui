import Module from '../../abc/Module';

import AboutScreen from './AboutScreen';

export default class AboutModule extends Module {

	constructor(app, name) {
		super(app, "AboutModule");

		app.Router.addRoute({
			path: '/about',
			exact: true,
			name: 'About',
			component: AboutScreen
		});
	}
}
