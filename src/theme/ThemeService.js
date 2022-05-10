import Service from '../abc/Service';
import ThemeReducer from './ThemeReducer';
import { CHANGE_THEME } from "./actions";

export default class ConfigService extends Service {

	constructor(app, serviceName = "ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("theme", ThemeReducer);
	}

	initialize() {
		// Detect initial theme (based on color-scheme aka user prefered theme)
		const prefersColorScheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
		? "dark"
		: "light"
		;

		// Dispatch tenants obtained from userinfo
		this.App.Store.dispatch({
			type: CHANGE_THEME,
			theme: prefersColorScheme
		});

		// TODO: Add listener to the system theme and change light/dark based on that
	}

}
