import { SET_HIDDEN_ITEMS_SIDEBAR } from "../../actions";

const initialState = {
	sidebarHiddenItems: undefined
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_HIDDEN_ITEMS_SIDEBAR: {
			return {
				...state,
				sidebarHiddenItems: action.sidebarHiddenItems
			}
		}
		default: {
			return state;
		}

	}
}
