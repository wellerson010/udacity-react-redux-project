import {
    ADD_ALL_COMMENTS,
    API_IDLE,
    CHANGE_STATUS_COMMENT_GET_ALL
} from '../constants';

const defaultState = {
    all: {
        ids: [],
        data: {}
    },
    status: {
        getAll: API_IDLE
    },
    votes: {
        
    }
};

export default function comment(state = defaultState, action) {
    switch (action.type) {
        case ADD_ALL_COMMENTS:
            return {
                ...state, 
                all: action.comments
            }
        case CHANGE_STATUS_COMMENT_GET_ALL:
            return {
                ...state,
                status: {
                    ...state.status,
                    getAll: action.status
                }
            }
        default:
            return state;
    }
}