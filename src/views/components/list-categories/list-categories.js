import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-block-ui/style.css';

import './list-categories.css';

const ListCategories = ({ categories }) => (
    <div className='container-categories'>
        <h2 className='container-categories-title'>Categories</h2>
        <ul className='container-categories-list'>
            <li key='all'>
                <NavLink
                    exact
                    to='/'
                    activeClassName="selected">
                    Tudo
                </NavLink>
            </li>
            {
                categories.ids.map(id => {
                    const category = categories.data[id];

                    return (
                        <li key={id}>
                            <NavLink exact to={'/' + category.path} activeClassName="selected">
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

export default withRouter(connect(mapStateToProps)(ListCategories));