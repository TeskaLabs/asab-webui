import { SET_HELP_PATH, SET_BREADCRUMB_NAME } from '../../actions';

const initialState = {
	helpPath: "",
	breadcrumbName: undefined
}

export default (state = initialState, action) => {

	switch (action.type) {
		case SET_HELP_PATH:
			return {
				...state,
				helpPath: action.helpPath
			}

		case SET_BREADCRUMB_NAME:
			return {
				...state,
				breadcrumbName: action.breadcrumbName
			}

		default:
			return state
	}
}
