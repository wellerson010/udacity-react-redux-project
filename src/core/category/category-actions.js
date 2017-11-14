import { ADD_ALL_CATEGORIES, CHANGE_LOADING_CATEGORY_GET_ALL } from '../action-constants';
import { getAll } from './category-service';

export function addAllCategories(categories){
    return {
        type: ADD_ALL_CATEGORIES,
        categories
    }
}

export function changeLoadingCategoryGetAll(loading){
    return {
        type: CHANGE_LOADING_CATEGORY_GET_ALL,
        loading
    }
}

export function getAllCategories(){
    
    return dispatch => {
        dispatch(changeLoadingCategoryGetAll(true));
        getAll().then(data => {
            dispatch(addAllCategories(data));
            dispatch(changeLoadingCategoryGetAll(false));
        });
    };
}