import Module from "asab-webui/abc/Module";

import LibraryContainer from "./containers/LibraryContainer";

export default class LibraryModule extends Module {
	constructor(app, name) {
		super(app, "LibraryModule");
		this.App = app;

		app.Router.addRoute({
			path: "/library",
			name: "Library",
			component: LibraryContainer,
			disableContainerBreadcrumbs: true
		});

		app.Navigation.addItem({
			name: "Library",
			url: "/library",
			icon: 'cil-library icons'
		});
	}
}
