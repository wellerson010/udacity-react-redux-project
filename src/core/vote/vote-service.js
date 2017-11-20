import { POST, COMMENT, UP_VOTE } from '../constants';
import request from '../api';

export function calculateAmountVote(vote, multiply = false){
    const value = (multiply) ? 2 : 1;
    const valueToIncrement = (vote == UP_VOTE) ? value : -(value);

    return  valueToIncrement;
}

export async function vote(id, vote, type) {
    const path = (type == POST)?'posts':'comments';
    
    const data = await request({
        url: `/${path}/${id}`,
        method: 'post',
        data: {
            option: vote
        }
    });

    return data;
}