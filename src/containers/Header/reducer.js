import { HELP_CONTENT } from '../../actions';

const initialState = {
    path: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HELP_CONTENT:
            return {
                path: action.path
            }

        default:
            return state
    }
}

