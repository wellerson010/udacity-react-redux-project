import React from 'react';

import './home-page.css';
import ListCategories from '../../components/list-categories';
import ListPosts from '../../components/list-posts';

const HomePage = ({ match: { params } }) => (
        <div className='container-home'>
            <div className='container-home-categories'>
                <ListCategories/>
            </div>
            <div className='container-home-posts'>
                <ListPosts 
                    categoryFiltered={params.category}
                />
            </div>
        </div>
 );

export default HomePage;