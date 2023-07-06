import { SET_HELP_PATH, SET_BREADCRUMB_NAME, SET_FLAG } from '../../actions';

const initialState = {
	helpPath: "",
	breadcrumbName: undefined, 
	flag: undefined
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
		
		case SET_FLAG:
			return {
				...state, 
				flag: action.flag
			}

		default:
			return state
	}
}
