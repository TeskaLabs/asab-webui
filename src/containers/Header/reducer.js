import { CHANGE_HELP_URL } from '../../actions';

const initialState = {
    url: "",
    icon: "cil-info",
    target: "_blank"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_HELP_URL:
            const newState = { ...action.payload }
            return { ...state, ...newState}
        default: return state;
    }
}