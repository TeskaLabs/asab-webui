import { types } from './actions'

const initialState = {
	userinfo: null,
	allowedTenants: null,
	currentAllowedTenant: null,
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
				allowedTenants: action.payload,
				currentAllowedTenant: action.currentAllowed
			}

		default:
			return state
	}
}
