// Actions
import {types} from './actions/actions';

const initialState = {
	config_created: false
}

export default function asabConfigReducer(state = initialState, action) {
	switch (action.type) {

		case types.CONFIG_CREATED:
			return {
				config_created: action.config_created
			}

		default:
			return state
	}
}
