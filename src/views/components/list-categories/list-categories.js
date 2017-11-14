import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import './list-categories.css';
import { getAllCategories } from '../../../core/category/category-actions';

class ListCategories extends React.Component {
    async componentDidMount(){
        this.props.getAllCategories();
    }

    render(){
        const { categories } = this.props;

        return (
            <BlockUi blocking={this.props.loading} className='container-categories'>
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
                        categories.all.ids.map(id => {
                            const category = categories.all.data[id];

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
            </BlockUi>
        )
    }
}

const mapStateToProps = ({category}) => {
    return {
        categories: category,
        loading: category.loading.getAll
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: data => dispatch(getAllCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);