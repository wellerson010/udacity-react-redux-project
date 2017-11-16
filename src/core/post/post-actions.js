import { 
    ADD_ALL_POSTS,
    API_FAIL,
    API_IDLE,
    API_LOADING,
    API_SUCCESS,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,

} from '../constants';
import { getAll, addNewPost } from './post-service';

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

export function changePostGetAll(loading){
    return {
        type: CHANGE_LOADING_POST_GET_ALL,
        loading
    }
}

export function changeStatusPostSave(status){
    return {
        type: CHANGE_STATUS_POST_SAVE,
        status
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

export function resetStatusPostSave(){
    return {
        type: CHANGE_STATUS_POST_SAVE,
        status: API_IDLE
    }
}

export function savePost(data){
    return dispatch => {
        dispatch(changeStatusPostSave(API_LOADING));

        addNewPost(data).then(data => {
            dispatch(changeStatusPostSave(API_SUCCESS));
        }).catch(data => {
            dispatch(changeStatusPostSave(API_FAIL));
        });
    }
}