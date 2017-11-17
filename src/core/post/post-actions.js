import {
    ADD_ALL_POSTS,
    API_FAIL,
    API_IDLE,
    API_LOADING,
    API_SUCCESS,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    VOTE_POST
} from '../constants';
import { addNewPost, getAll, orderAllPosts, vote } from './post-service';
import store from '../store';

export function addAllPosts(posts) {
    return {
        type: ADD_ALL_POSTS,
        posts
    }
}

export function changeOrderAllPosts(fieldOrder, orderAsc) {
    const { post } = store.getState();
    const { order } = post.all;

    if (!fieldOrder){
        fieldOrder = order.fieldOrder;
    }

    if (typeof (orderAsc) == 'undefined') {
        orderAsc = (order.fieldOrder === fieldOrder) ? !order.orderAsc : true;
    }

    const ids = orderAllPosts(post.all, fieldOrder, orderAsc);

    return {
        type: CHANGE_ORDER_ALL_POSTS,
        ids,
        fieldOrder,
        orderAsc
    }
}

export function changeStatusPostGetAll(status) {
    return {
        type: CHANGE_STATUS_POST_GET_ALL,
        status
    }
}

export function changeStatusPostSave(status) {
    return {
        type: CHANGE_STATUS_POST_SAVE,
        status
    }
}

export function getAllPosts() {
    return dispatch => {
        dispatch(changeStatusPostGetAll(API_LOADING));

        getAll().then(data => {
            dispatch(addAllPosts(data));
            dispatch(changeOrderAllPosts(null, true));
            dispatch(changeStatusPostGetAll(API_SUCCESS));
        }).catch(data => {
            dispatch(changeStatusPostGetAll(API_FAIL));
        });
    }
}

export function resetStatusPostSave() {
    return {
        type: CHANGE_STATUS_POST_SAVE,
        status: API_IDLE
    }
}

export function savePost(data) {
    return dispatch => {
        dispatch(changeStatusPostSave(API_LOADING));

        addNewPost(data).then(data => {
            dispatch(changeStatusPostSave(API_SUCCESS));
        }).catch(data => {
            dispatch(changeStatusPostSave(API_FAIL));
        });
    }
}

export function votePost(postId, option){
    return dispatch => {
        vote(postId, option).then(data => {
            console.log(data);
            dispatch({
                type: VOTE_POST,
                id: postId,
                option
            });
        });
    }
}