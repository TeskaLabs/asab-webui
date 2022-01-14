import { SET_SIDEBAR, CHANGE_SIDEBAR_SIZE, SET_SMALL_SCREEN } from "../actions";

const initialState = {
	isSidebarOpen: true,
	isSidebarMinimized: false,
	screen: { isSmall: false, isSidebarOpen: true }
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SIDEBAR: {
			return {
				...state,
				isSidebarOpen: !state.isSidebarOpen,
			}
		}
		case CHANGE_SIDEBAR_SIZE: {
			return {
				...state,
				isSidebarMinimized: !state.isSidebarMinimized
			}
		}
		case SET_SCREEN: {
			return {
				...state,
				screen: action.screen
			}
		}
		default: {
			return state;
		}

	}
}
