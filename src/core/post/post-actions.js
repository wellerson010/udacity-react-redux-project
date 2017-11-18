import {
    ADD_ALL_POSTS,
    API_FAIL,
    API_IDLE,
    API_LOADING,
    API_SUCCESS,
    ADD_POST,
    ADD_VOTE_POST,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    CHANGE_VOTE_POST,
    DELETE_POST,
    DOWN_VOTE,
    EDIT_POST,
    REMOVE_VOTE_POST,
    UP_VOTE
} from '../constants';
import { add, deletePost as del, getAll, edit, orderAllPosts, votePost } from './post-service';
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

export function deletePost(postId){
    return async dispatch => {
        await del(postId);
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

export function resetStatusPostSave() {
    return {
        type: CHANGE_STATUS_POST_SAVE,
        status: API_IDLE
    }
}

export function vote(postId, voteOption) {
    const { votes } = store.getState().post;

    const userAlreadyVoted = (votes[postId]);

    return async dispatch => {
        if (userAlreadyVoted) {
            if (votes[postId] === voteOption) {
                voteOption = (voteOption === UP_VOTE)?DOWN_VOTE: UP_VOTE;

                await votePost(postId, voteOption);

                dispatch({
                    type: REMOVE_VOTE_POST,
                    id: postId
                });
                dispatch({
                    type: CHANGE_VOTE_POST,
                    id: postId,
                    vote: voteOption
                });
            }
            else {
                await votePost(postId, voteOption);
                await votePost(postId, voteOption); //hack por causa da API

                dispatch({
                    type: ADD_VOTE_POST,
                    id: postId,
                    vote: voteOption,
                });
                dispatch({
                    type: CHANGE_VOTE_POST,
                    id: postId,
                    vote: voteOption,
                    multiply: true
                });
            }
        }
        else {
            await votePost(postId, voteOption);

            dispatch({
                type: ADD_VOTE_POST,
                id: postId,
                vote: voteOption,
            });
            dispatch({
                type: CHANGE_VOTE_POST,
                id: postId,
                vote: voteOption
            });
        }
    }
}