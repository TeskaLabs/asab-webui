import { HELP_CONTENT } from '../../actions';

const initialState = {
    content: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HELP_CONTENT:
            return {
                content: action.content
            }

        default:
            return state
    }
}
