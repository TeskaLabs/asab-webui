import Module from '../../abc/Module';

import AboutScreen from './AboutScreen';
console.log("hello from AboutModule");
export default class AboutModule extends Module {

	constructor(app, name) {
		super(app, "AboutModule");

		app.Router.addRoute({
			path: '/auth/about',
			exact: true,
			name: 'About',
			component: AboutScreen
		});
	}
}
