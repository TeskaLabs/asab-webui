import { SET_SIDEBAR, CHANGE_SIDEBAR_SIZE } from "../actions";

const initialState = {
	isSidebarOpen: true,
	isSidebarMinimized: false
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
		default: {
			return state;
		}

	}
}
