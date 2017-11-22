import { add, getAllByPost, remove } from './comment-service';
import {
    ADD_COMMENT,
    API_SUCCESS,
    API_LOADING,
    ADD_ALL_COMMENTS,
    CHANGE_STATUS_COMMENT_GET_ALL,
    CHANGE_VOTE_COMMENT,
    DELETE_COMMENT
} from '../constants';

export function addAllComments(comments) {
    return {
        type: ADD_ALL_COMMENTS,
        comments
    }
}

export function addComment(data) {
    return dispatch => {
        add(data).then(comment => {
            dispatch({
                type: ADD_COMMENT,
                comment
            });
        })
    }
}

export function changeVoteComment(id, vote, amount) {
    return {
        type: CHANGE_VOTE_COMMENT,
        id,
        vote,
        amount
    }
}

export function changeStatusCommentGetAll(status) {
    return {
        type: CHANGE_STATUS_COMMENT_GET_ALL,
        status
    }
}

export function deleteComment(commentId) {
    return async dispatch => {
        await remove(commentId);
        dispatch({
            type: DELETE_COMMENT,
            id: commentId
        });
    }
}

export function getAll(postId) {
    return async dispatch => {
        console.log('AAA');
        dispatch(changeStatusCommentGetAll(API_LOADING));
        const comments = await getAllByPost(postId);
        dispatch(addAllComments(comments));
        dispatch(changeStatusCommentGetAll(API_SUCCESS));
    }
}