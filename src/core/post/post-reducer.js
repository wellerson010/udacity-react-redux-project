import omit from 'lodash.omit';

import {
    API_IDLE,
    ADD_ALL_POSTS,
    ADD_POST,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    CHANGE_VOTE_POST,
    DELETE_POST,
    EDIT_POST
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
        case ADD_POST:
            return {
                ...state,
                all: {
                    ...state.all,
                    ids: state.all.ids.concat(action.post.id),
                    data: {
                        ...state.all.data,
                        [action.post.id]: action.post
                    }
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
        case CHANGE_VOTE_POST:
            const totalVotes = state.all.data[action.id].voteScore;

            return {
                ...state,
                all: {
                    ...state.all,
                    data: {
                        ...state.all.data,
                        [action.id]: {
                            ...state.all.data[action.id],
                            voteScore: totalVotes + action.amount
                        }
                    }
                }
            }
        case DELETE_POST:
            return {
                ...state,
                all: {
                    ...state.all,
                    ids: state.all.ids.filter(id => id !== action.id),
                    data: {
                        ...omit(state.all.data, [action.id])
                    }
                }
            }
        case EDIT_POST:
            return {
                ...state,
                all: {
                    ...state.all,
                    data: {
                        ...state.all.data,
                        [action.id]: {
                            ...state.all.data[action.id],
                            title: action.title,
                            body: action.body
                        }
                    }
                }
            }
        default:
            return state;
    }
}