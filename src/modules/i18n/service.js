import Service from 'asab-webui/abc/Service';
import i18n from "i18next";
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

export default class I18nService extends Service {

	constructor(app, name="I18nService") {
		super(app, name);
		this.App.addSplashScreenRequestor(this);

		{/* TODO: reinitialize i18n when dynamic configuration is made available */}
		let config = app.Config.get('i18n');
		if (config === undefined) {
			config = {debug: true}
		}

		i18n
		.use(HttpBackend)
		.use(initReactI18next)
		.use(LanguageDetector)
		.init(config, (err, t) => {
			this.App.removeSplashScreenRequestor(this);

			if (err) {
				app.addAlert("warning", "Failed to load localizations.");
				return console.log('something went wrong loading', err);
			}
		});
	}

}
