import { types } from './actions'

const initialState = {
	userinfo: null,
	tenants: null,
	current: null,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USERINFO:
			return {
				...state,
				userinfo: action.payload
			}

		case types.AUTH_TENANTS:
			return {
				...state,
				tenants: action.payload,
				current: action.current
			}

		default:
			return state
	}
}
