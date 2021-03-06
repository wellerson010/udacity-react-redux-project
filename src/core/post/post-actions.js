import {
    ADD_ALL_POSTS,
    API_FAIL,
    API_LOADING,
    API_SUCCESS,
    ADD_POST,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    CHANGE_VOTE_POST,
    DELETE_POST,
    EDIT_POST
} from '../constants';
import { add, remove, getAll, edit, orderAllPosts } from './post-service';
import store from '../store';

export function addAllPosts(posts) {
    return {
        type: ADD_ALL_POSTS,
        posts
    }
}

export function addPost(data) {
    return dispatch => {
        dispatch(changeStatusPostSave(API_LOADING));

        add(data).then(post => {
            dispatch({
                type: ADD_POST,
                post: post
            });

            dispatch(refreshOrderPost());

            dispatch(changeStatusPostSave(API_SUCCESS));
        }).catch(data => {
            dispatch(changeStatusPostSave(API_FAIL));
        });
    }
}

export function changeOrderAllPosts(fieldOrder, orderAsc) {
    const { post } = store.getState();
    const { order } = post.all;

    if (!fieldOrder) {
        fieldOrder = order.fieldOrder;
    }

    if (typeof (orderAsc) === 'undefined') {
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

export function changeVotePost(id, vote, amount){
    return dispatch => {
        dispatch({
            type: CHANGE_VOTE_POST,
            id,
            vote,
            amount
        });

        dispatch(refreshOrderPost());
    }
}

export function deletePost(postId){
    return async dispatch => {
        await remove(postId);
        dispatch({
            type: DELETE_POST,
            id: postId
        });
    }
}

export function editPost(data){
    return async dispatch => {
        await edit(data.id, data.title, data.body);

        dispatch({
            type: EDIT_POST,
            id: data.id,
            title: data.title, 
            body: data.body
        });
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

export function refreshOrderPost(){
    return dispatch => {
        const { post } = store.getState();
        
        const  { fieldOrder, orderAsc } = post.all.order;

        dispatch(changeOrderAllPosts(fieldOrder, orderAsc));
    }
}