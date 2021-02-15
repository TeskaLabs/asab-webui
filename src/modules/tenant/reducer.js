// Actions
import {types} from './actions';
	

const initialState = {
	tenants: [],
	current: null,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case types.TENANTS_CHANGED:
			return {
				tenants: action.payload,
				current: action.current,
			}

		default:
			return state
	}
}
