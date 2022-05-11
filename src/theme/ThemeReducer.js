import { CHANGE_THEME } from "./actions";

const themeInitState = null;

export default function ThemeReducer(state = themeInitState, action) {
	switch (action.type) {
		
		case CHANGE_THEME: 
			const html = document.querySelector('html');
			html.dataset.theme = action.theme;
			return action.theme;
		
		default:
			return state;
	}
}
