import { schema } from 'normalizr';

export const categorySchema = new schema.Entity('categories', {} ,{
    idAttribute: 'name'
});