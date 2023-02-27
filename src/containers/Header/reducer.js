import { HELP_DESCRIPTION } from '../../actions';

const initialState = {
    description: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HELP_DESCRIPTION:
            return {
                description: action.description
            }

        default:
            return state
    }
}