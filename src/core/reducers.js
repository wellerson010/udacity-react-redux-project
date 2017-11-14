import { combineReducers } from 'redux';

import category from './category/category-reducer';
import post from './post/post-reducer';

export default combineReducers({
    category,
    post
});