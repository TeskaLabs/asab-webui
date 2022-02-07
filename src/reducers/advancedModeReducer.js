import { SET_ADVANCED_MODE } from '../actions';

const advModeInitialState = {
	enabled: false,
}

function advancedModeReducer(state = advModeInitialState, action) {
	switch (action.type) {

		case SET_ADVANCED_MODE: {
			return Object.assign({}, state, {
				enabled: action.enabled
			})
		}

		default:
			return state
	}
}

export default advancedModeReducer;