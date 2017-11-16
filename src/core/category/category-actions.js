import { 
    ADD_ALL_CATEGORIES,
    API_FAIL,
    API_LOADING,
    API_SUCCESS,
    CHANGE_STATUS_CATEGORY_GET_ALL
} from '../constants';
import { getAll } from './category-service';

export function addAllCategories(categories){
    return {
        type: ADD_ALL_CATEGORIES,
        categories
    }
}

export function changeStatusCategoryGetAll(status){
    return {
        type: CHANGE_STATUS_CATEGORY_GET_ALL,
        status
    }
}

export function getAllCategories(){
    return dispatch => {
        dispatch(changeStatusCategoryGetAll(API_LOADING));
        getAll().then(data => {
            dispatch(addAllCategories(data));
            dispatch(changeStatusCategoryGetAll(API_SUCCESS));
        }).catch(data => {
            dispatch(changeStatusCategoryGetAll(API_FAIL));
        });
    };
}