// Actions
import { CHANGE_CONFIG, SET_DEV_CONFIG } from '../actions';

const initialState = {};

export default function ConfigReducer(state = initialState, action) {

	switch (action.type) {

		case CHANGE_CONFIG: {
			return action.config;
		}

		case SET_DEV_CONFIG: {
			return action.dev_config;
		}

		default:
			return state;
	}
}
