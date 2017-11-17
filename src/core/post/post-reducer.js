import {
    API_IDLE,
    ADD_ALL_POSTS,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    API_FAIL,
    VOTE_POST
} from '../constants';

const defaultState = {
    all: {
        ids: [],
        data: {},
        order: {
            fieldOrder: 'voteScore',
            orderAsc: true
        }
    },
    status: {
        getAll: API_IDLE,
        savePost: API_IDLE
    },
    loading: {
        getAll: false
    },
    vote: {

    }
}

export default function post(state = defaultState, action) {
    switch (action.type) {
        case ADD_ALL_POSTS:
            return {
                ...state,
                all: {
                    ...state.all,
                    ...action.posts
                }
            }
        case CHANGE_ORDER_ALL_POSTS:
            return {
                ...state,
                all: {
                    ...state.all,
                    ids: action.ids,
                    order: {
                        ...state.all.order,
                        fieldOrder: action.fieldOrder,
                        orderAsc: action.orderAsc
                    }
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
            case VOTE_POST:
            return {
                ...state,
                vote: {
                    ...state.vote,
                    [action.id]: action.option
                }
            }
        default:
            return state;
    }
}