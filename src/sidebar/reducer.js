import { SET_SIDEBAR } from "../actions";

const initialState = {
	isSidebarOpen: true
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SIDEBAR: {
			console.log("action")
			return {
				...state,
				isSidebarOpen: !state.isSidebarOpen
			}
		}
		default: {
			return {
				...state,
				isSidebarOpen: true
			}
		}

	}
}
