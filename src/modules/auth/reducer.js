import { types } from './actions'

const initialState = {
	userinfo: null,
	unauthorizedItem: [],
	unauthorizedChildren: [],
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USERINFO:
			return {
				...state,
				userinfo: action.payload
			}

		case types.UNAUTHORIZED_ITEM:
			return {
				...state,
				unauthorizedItem: action.unauthItem
			}

		case types.UNAUTHORIZED_CHILDREN:
			return {
				...state,
				unauthorizedChildren: action.unauthChildren
			}

		default:
			return state
	}
}
