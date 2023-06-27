import { HELP_CONTENT, SET_BREADCRUMB_NAME, SET_FLAG } from '../../actions';

const initialState = {
	content: "",
	breadcrumbName: undefined, 
	flag: undefined
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
		case SET_FLAG:
			return {
				...state, 
				flag: action.flag
			}
		default:
			return state
	}
}
