import { ADD_ALL_CATEGORIES } from '../action-constants';

export function addAllCategories(categories){
    return {
        type: ADD_ALL_CATEGORIES,
        categories
    }
}