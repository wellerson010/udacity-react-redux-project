import Request from '../api';

export async function getAll(){
  const categories = await Request({
    url: 'categories'
  });

  return categories;
}