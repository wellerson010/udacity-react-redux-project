import { 
    ADD_ALL_CATEGORIES,
    API_IDLE,
    CHANGE_STATUS_CATEGORY_GET_ALL
} from '../constants';

const defaultState = {
    all: {
        ids: [],
        data: {}
    },
    status: {
        getAll: API_IDLE
    }
}

export default function category(state = defaultState, action){
    switch(action.type){
        case ADD_ALL_CATEGORIES:
            return {
                ...state,
                all: action.categories
            };
        case CHANGE_STATUS_CATEGORY_GET_ALL:
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