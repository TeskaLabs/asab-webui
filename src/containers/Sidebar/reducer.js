import { SET_HIDDEN_ITEMS_SIDEBAR, COLLAPSE_SIDEBAR } from "../../actions";

const initialState = {
	sidebarHiddenItems: undefined,
	isSidebarCollapsed: false
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
		default: {
			return state;
		}

	}
}
