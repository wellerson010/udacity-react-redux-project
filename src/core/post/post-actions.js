import {
    ADD_ALL_POSTS,
    API_FAIL,
    API_IDLE,
    API_LOADING,
    API_SUCCESS,
    ADD_VOTE_POST,
    CHANGE_ORDER_ALL_POSTS,
    CHANGE_STATUS_POST_GET_ALL,
    CHANGE_STATUS_POST_SAVE,
    CHANGE_VOTE_POST,
    DELETE_POST,
    DOWN_VOTE,
    REMOVE_VOTE_POST,
    UP_VOTE
} from '../constants';
import { addNewPost, deletePost as del, getAll, orderAllPosts, votePost } from './post-service';
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

export function vote(postId, voteOption) {
    const { vote } = store.getState().post;

    const userAlreadyVoted = (vote[postId]);

    return async dispatch => {
        if (userAlreadyVoted) {
            if (vote[postId] === voteOption) {
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