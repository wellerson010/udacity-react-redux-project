import { combineReducers } from 'redux';

import category from './category/category-reducer';
import post from './post/post-reducer';
import comment from './comment/comment-reducer';

export default combineReducers({
    category,
    comment,
    post
});