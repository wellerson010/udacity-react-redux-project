import { ADD_ALL_POSTS, CHANGE_ORDER_ALL_POSTS, CHANGE_LOADING_POST_GET_ALL } from '../action-constants';
import { getAll } from './post-service';

export function addAllPosts(posts){
    return {
        type: ADD_ALL_POSTS,
        posts
    }
}

export function changeOrderAllPosts (ids){
    return {
        type: CHANGE_ORDER_ALL_POSTS,
        ids
    }
}

export function changeLoadingPostGetAll(loading){
    return {
        type: CHANGE_LOADING_POST_GET_ALL,
        loading
    }
}

export function getAllPosts(){
    return dispatch => {
        dispatch(changeLoadingPostGetAll(true));

        getAll().then(data => {
            dispatch(addAllPosts(data));
            dispatch(changeLoadingPostGetAll(false));
        });
    }
}