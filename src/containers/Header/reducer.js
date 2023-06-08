import { HELP_CONTENT, SET_BREADCRUMB_NAME } from '../../actions';

const initialState = {
	content: "",
	breadcrumbName: undefined
}

export default (state = initialState, action) => {

	switch (action.type) {
		case HELP_CONTENT:
			return {
				...state,
				content: action.content
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
