import omit from 'lodash.omit';

import { ADD_VOTE, REMOVE_VOTE } from '../constants';

const defaultState = {

}

export default function vote(state = defaultState, action) {
    switch (action.type) {
        case ADD_VOTE:
            return {
                ...state,
                [action.id]: action.vote
            }
        case REMOVE_VOTE:
            return {
                ...omit(state, [action.id])
            }
        default:
            return state;
    }
}