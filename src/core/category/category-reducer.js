import { ADD_ALL_CATEGORIES } from '../action-constants';

const defaultState = {
    entities: {},
    result: {
        categories: []
    }
}

export default function category(state = defaultState, action){
    switch(action.type){
        case ADD_ALL_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}