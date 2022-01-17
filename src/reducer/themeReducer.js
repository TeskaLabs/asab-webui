import { CHANGE_THEME } from '../actions';

const initialState = "light-mode"

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_THEME:
			return state === "light-mode" ? "dark-mode" : "light-mode";
		default:
			return state;
	}
}

export default themeReducer;