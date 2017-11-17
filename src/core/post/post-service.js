import store from '../store';
import request from '../api';
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

export async function vote(id, option){
  const data = await request({
    url: `/post/${id}`,
    method: 'put',
    data: {
      option
    }
  });

  return data;
}