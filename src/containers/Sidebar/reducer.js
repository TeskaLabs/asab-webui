import { SET_HIDDEN_ITEMS_SIDEBAR, COLLAPSE_SIDEBAR, SET_SMALL_SIDEBAR } from "../../actions";

const initialState = {
	sidebarHiddenItems: undefined,
	isSidebarCollapsed: false,
	isSmallSidebarOpen: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_HIDDEN_ITEMS_SIDEBAR: {
			return {
				...state,
				sidebarHiddenItems: action.sidebarHiddenItems
			}
		}
		case COLLAPSE_SIDEBAR: {
			return {
				...state,
				isSidebarCollapsed: action.isSidebarCollapsed
			}
		}
		case SET_SMALL_SIDEBAR: {
			return {
				...state,
				isSmallSidebarOpen: !state.isSmallSidebarOpen
			}
		}
		default: {
			return state;
		}

	}
}
