// Actions
import { CHANGE_CONFIG } from '../actions';

const initialState = {};

export default function ConfigReducer(state = initialState, action) {

	switch (action.type) {
		
		case CHANGE_CONFIG: {
			return action.config
		}

		default:
			return state
	}
}
