import { normalizeData } from '../utils';
import request from '../api';


export async function getAll() {
  const data = await request({
    url: 'categories'
  });

  const categories = normalizeData(data.categories, { attributeId: 'name' })

  return categories;
}