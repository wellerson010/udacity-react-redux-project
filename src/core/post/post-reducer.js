import { ADD_ALL_POSTS, CHANGE_ORDER_ALL_POSTS, CHANGE_LOADING_POST_GET_ALL } from '../action-constants';

const defaultState = {
    all: {
        ids: [],
        data: {}
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
                ['all']: action.posts
            }
        case CHANGE_ORDER_ALL_POSTS:
            return {
                ...state,
                ['all']: {
                    ...state.all,
                    ['ids']: action.ids
                }
            }
        case CHANGE_LOADING_POST_GET_ALL:
            return {
                ...state,
                ['loading']: {
                    ...state.loading,
                    ['getAll']: action.loading
                }
            }
        default:
            return state;
    }
}