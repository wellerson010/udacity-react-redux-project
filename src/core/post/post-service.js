import request from '../api';
import { normalizeData, orderByState, generateUiid } from '../utils';

export async function add({ title, body, author, category }) {
  const time = Date.now();
  const id = generateUiid();

  const post = {
    id: id,
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

export async function remove(id){
  const data = await request({
    url: `/posts/${id}`,
    method: 'delete'
  });

  return data;
}

export async function edit(id, title, body){
  const data = await request({
    url: `/posts/${id}`,
    method: 'put',
    data: {
      title,
      body
    }
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