import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-block-ui/style.css';

import './list-categories.css';

const ListCategories = ({ categories }) => (
    <div className='container-categories'>
        <h2 className='container-categories-title'>Categories</h2>
        <ul className='container-categories-list'>
            <li key='all'>
                <NavLink
                    to='/category/all'
                    activeClassName="selected">
                    All
                </NavLink>
            </li>
            {
                categories.ids.map(id => {
                    const category = categories.data[id];

                    return (
                        <li key={id}>
                            <NavLink to={'/category/' + category.path} activeClassName="selected">
                                {
                                    category.name
                                }
                            </NavLink>
                        </li>
                    );
                })
            }
        </ul>
    </ div>
);

const mapStateToProps = ({ category }) => ({
    categories: category.all
});

export default connect(mapStateToProps)(ListCategories);