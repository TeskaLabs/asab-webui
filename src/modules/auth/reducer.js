import { types } from './actions'

const initialState = {
	userinfo: null,
	tenants: [],
	current: null,

}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USERINFO:
			return {
				...state,
				userinfo: action.payload,
				tenants: action.tenants,
				current: action.current,
			}

		// case types.TENANTS_CHANGED:
		// 	return {
		// 		tenants: action.tenants,
		// 		current: action.current,
		// 	}

		default:
			return state
	}
}
