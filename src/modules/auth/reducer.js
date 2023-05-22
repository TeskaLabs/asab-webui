import { types } from './actions'

const initialState = {
	userinfo: null,
	resources: [],
	unauthorizedNavItem: [],
	unauthorizedNavChildren: [],
	sessionExpired: false
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USERINFO:
			return {
				...state,
				userinfo: action.payload
			}

		case types.AUTH_RESOURCES:
			return {
				...state,
				resources: action.resources
			}

		case types.NAVIGATION_UNAUTHORIZED_ITEM:
			return {
				...state,
				unauthorizedNavItem: action.unauthorizedNavItem
			}

		case types.NAVIGATION_UNAUTHORIZED_CHILDREN:
			return {
				...state,
				unauthorizedNavChildren: action.unauthorizedNavChildren
			}

		case types.AUTH_SESSION_EXPIRATION:
			return {
				...state,
				sessionExpired: action.sessionExpired
			}

		default:
			return state
	}
}
