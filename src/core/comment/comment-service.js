import request from '../api';
import { normalizeData } from '../utils';

export async function getAllByPost(postId){
    const data = await request({
        url: `/posts/${postId}/comments`
    });

    const comments = normalizeData(data);
    return comments;
}