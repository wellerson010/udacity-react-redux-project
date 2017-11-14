import { ADD_ALL_CATEGORIES, CHANGE_LOADING_CATEGORY_GET_ALL } from '../action-constants';

const defaultState = {
    all: {
        ids: [],
        data: {}
    },
    loading: {
        getAll: false
    }
}

export default function category(state = defaultState, action){
    switch(action.type){
        case ADD_ALL_CATEGORIES:
            return {
                ...state,
                ['all']: action.categories
            };
        case CHANGE_LOADING_CATEGORY_GET_ALL:
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