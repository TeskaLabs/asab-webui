import Service from 'asab-webui/abc/Service';
import i18n from "i18next";
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

export default class I18nService extends Service {

	constructor(app, name="I18nService") {
		super(app, name);
		this.App.addSplashScreenRequestor(this);

		// TODO: reinitialize i18n when dynamic configuration is made available
		var config = app.Config.get('i18n');
		if (config === undefined) {
			config = {
				debug: true
			}
		}

		// config.supportedLngs is not an array but some faked array crap
		// so we need to convert that
		var supportedLngs = []
		for (var i in config.supportedLngs) {
			supportedLngs.push(config.supportedLngs[i]);
		}
		config.supportedLngs = supportedLngs;

		// Missing keys are displayed without the namespace
		config.parseMissingKeyHandler = (key) => {
			var n = key.lastIndexOf("|");
			if (n > 0) {
				return key.slice(n+1);
			}
			return key;
		}

		// Set default key separator
		config.keySeparator = "|";

		i18n
		.use(HttpBackend)
		.use(initReactI18next)
		.use(LanguageDetector)
		.init(config, (err, t) => {
			this.App.removeSplashScreenRequestor(this);
			if (err) {
				//TODO: only in case of final error, show: app.addAlert("warning", "Failed to load localizations.");
				console.log('Failed to load localizations:', err);
			}
		});
	}

}
