import omit from 'lodash.omit';

import {
    ADD_ALL_COMMENTS,
    ADD_COMMENT,
    API_IDLE,
    CHANGE_STATUS_COMMENT_GET_ALL,
    CHANGE_VOTE_COMMENT,
    DELETE_COMMENT
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
        case ADD_COMMENT:
            return {
                ...state,
                all: {
                    ...state.all,
                    ids: state.all.ids.concat(action.comment.id),
                    data: {
                        ...state.all.data,
                        [action.comment.id]: action.comment
                    }
                }
            }
        case CHANGE_STATUS_COMMENT_GET_ALL:
            return {
                ...state,
                status: {
                    ...state.status,
                    getAll: action.status
                }
            }
        case CHANGE_VOTE_COMMENT:
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
        case DELETE_COMMENT:
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
        default:
            return state;
    }
}