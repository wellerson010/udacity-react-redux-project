import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.css';
import { capitalizeWord } from '../../../core/utils';

const Header = ({ categories }) => (
    <div className="main-header">
        <div className="content">
            <Link to='/'>
                <h1 className="title">Leitura</h1>
            </Link>

            <ul className="menu">
                <li className="item-menu">
                    Categorias
                    <div className="sub-menu">
                        <ul>
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
                                            <NavLink to={'/' + category.path} activeClassName="selected">
                                                {capitalizeWord(category.name)}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

const mapStateToProps = ({ category }) => ({
    categories: category.all
});

export default withRouter(connect(mapStateToProps)(Header));