import { CHANGE_LANGUAGE } from "./actions";

const initialValue = {
	language: 'en'
}

export default function languageReducer (state = initialValue, action) {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return { ...state, language: action.language }
		default:
			return state
	}
}
