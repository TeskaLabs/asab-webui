import { CHANGE_THEME } from "./actions";

const themeInitState = "light";

export default function ThemeReducer(state = themeInitState, action) {
	switch (action.type) {
		
		case CHANGE_THEME: 
			const html = document.querySelector('html');
			html.dataset.theme = action.theme;
			const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
			if (metaColorScheme == null) {
				// Create <meta ... /> for the color scheme
				var meta = document.createElement('meta');
				meta.name = "color-scheme";
				meta.content = action.theme;
				document.getElementsByTagName('head')[0].appendChild(meta);

			} else {
				// Set the color scheme
				metaColorScheme.setAttribute("content", action.theme);
			}
			return action.theme;
		
		default:
			return state;
	}
}
