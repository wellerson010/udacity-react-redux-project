import { normalize } from 'normalizr';

import Request from '../api';
import { categorySchema } from './category-schema';

export async function getAll(){
  const data = await Request({
    url: 'categories'
  });

  const categories = normalize(data, {
    categories: [categorySchema]
  });

  return categories;
}