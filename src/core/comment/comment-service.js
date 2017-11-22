import request from '../api';
import { normalizeData, generateUiid } from '../utils';

export async function add({ body, author, parentId }) {
  const time = Date.now();
  const id = generateUiid();

  const post = {
    id: id,
    timestamp: time,
    body,
    author,
    parentId
  }

  const data = await request({
    url: '/comments',
    method: 'post',
    data: post
  });

  return data;
}

export async function getAllByPost(postId) {
    const data = await request({
        url: `/posts/${postId}/comments`
    });

    const comments = normalizeData(data);
    return comments;
}

export async function remove(id) {
    const data = await request({
        url: `/comments/${id}`,
        method: 'delete'
    });

    return data;
}