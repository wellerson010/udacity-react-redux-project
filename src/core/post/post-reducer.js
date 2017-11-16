import {
    API_IDLE,
    ADD_ALL_POSTS,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    API_FAIL
} from '../constants';

const defaultState = {
    all: {
        ids: [],
        data: {}
    },
    status: {
        getAll: API_IDLE,
        savePost: API_IDLE
    },
    loading: {
        getAll: false
    }
}

export default function post(state = defaultState, action) {
    switch (action.type) {
        case ADD_ALL_POSTS:
            return {
                ...state,
                all: action.posts
            }
        case CHANGE_ORDER_ALL_POSTS:
            return {
                ...state,
                all: {
                    ...state.all,
                    ids: action.ids
                }
            }
        case CHANGE_STATUS_POST_GET_ALL:
            return {
                ...state,
                status: {
                    ...state.status,
                    getAll: action.status
                }
            }
        case CHANGE_STATUS_POST_SAVE:
            return {
                ...state,
                status: {
                    ...state.status,
                    savePost: action.status
                }
            }
        default:
            return state;
    }
}