import omit from 'lodash.omit';

import {
    API_IDLE,
    ADD_ALL_POSTS,
    ADD_VOTE_POST,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    CHANGE_VOTE_POST,
    DOWN_VOTE,
    REMOVE_VOTE_POST,
    UP_VOTE
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
        case ADD_VOTE_POST:
            return {
                ...state,
                vote: {
                    ...state.vote,
                    [action.id]: action.vote
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
            const value = (action.multiply) ? 2 : 1;
            const valueToIncrement = (action.vote == UP_VOTE) ? value : -(value);

            return {
                ...state,
                all: {
                    ...state.all,
                    data: {
                        ...state.all.data,
                        [action.id]: {
                            ...state.all.data[action.id],
                            voteScore: totalVotes + valueToIncrement
                        }
                    }
                }
            }
        case REMOVE_VOTE_POST:
            return {
                ...state,
                vote: {
                    ...omit(state.vote, [action.id])
                }
            }
        default:
            return state;
    }
}