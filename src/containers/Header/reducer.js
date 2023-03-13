import { HELP_CONTENT } from '../../actions';

const initialState = {
    description: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HELP_CONTENT:
            return {
                description: action.description
            }

        default:
            return state
    }
}