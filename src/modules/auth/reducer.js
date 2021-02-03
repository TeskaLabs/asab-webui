import { types } from './actions'

const initialState = {
	userinfo: null,
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_USERINFO:
			return {
				...state,
				userinfo: action.payload
			}

		default:
			return state
	}
}
