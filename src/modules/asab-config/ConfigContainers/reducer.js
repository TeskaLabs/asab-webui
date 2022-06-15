// Actions
import {types} from './actions/actions';

const initialState = {
	config_created: false,
	config_removed: false,
	config_imported: false
}

export default function asabConfigReducer(state = initialState, action) {
	switch (action.type) {

		case types.CONFIG_CREATED:
			return {
				config_created: action.config_created
			};
		case types.CONFIG_REMOVED:
			return {
				config_removed: action.config_removed
			}
		case types.CONFIG_IMPORTED:
			return {
				config_imported: action.config_imported
			}
		default:
			return state
	}
}
