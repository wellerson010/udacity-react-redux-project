import request from '../api';
import { DOWN_VOTE, UP_VOTE } from '../constants';
import { normalizeData, orderByState } from '../utils';

export async function addNewPost({ title, body, author, category }) {
  const time = Date.now();

  const post = {
    id: time,
    timestamp: time,
    title,
    body,
    author,
    category
  }

  const data = await request({
    url: '/posts',
    method: 'post',
    data: post
  });

  return data;
}

export async function getAll() {
  const data = await request({
    url: '/posts'
  });

  const posts = normalizeData(data);

  return posts;
}

export function orderAllPosts(posts, field, asc) {
  return orderByState(posts, field, asc);
}

export async function votePost(id, vote) {

  const data = await request({
    url: `/posts/${id}`,
    method: 'post',
    data: {
      option: vote
    }
  });

  return data;
}