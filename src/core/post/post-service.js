import store from '../store';
import request from '../api';
import { normalizeData, orderByState } from '../utils';

export async function getAll(){
    const data = await request({
        url: '/posts'
    });

    const posts = normalizeData(data);

    return posts;
}

/*
Método comentado pois não o estou utilizando. Filtro as categorias dos posts já obtidos via getAll
export async function getAllByCategory(category){
    const data = await request({
      url: `${category}/posts`
    });
  
    const posts = normalizeData(data, { attributeId: 'name' })
  
    return posts;
  }
*/
  
  export function orderAllPosts(field, asc = true){
    const { post } = store.getState();

    return orderByState(post.all, field, asc);
  }