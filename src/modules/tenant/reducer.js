// Actions
import {types} from './actions';
	

const initialState = {
	tenants: [],
	current: null,
	invalid: false
}

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case types.TENANTS_CHANGED:
			return {
				tenants: action.tenants_list,
				current: action.current,
				invalid: action.invalid
			}

		default:
			return state
	}
}
