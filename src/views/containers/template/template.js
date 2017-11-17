import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import './template.css';
import { getAllCategories } from '../../../core/category/category-actions';
import { API_SUCCESS } from '../../../core/constants';
import Header from '../../components/header';
import ListCategories from '../../components/list-categories';
import ListPosts from '../../containers/list-posts';

class Template extends React.Component {
    componentDidMount() {
        this.props.getAllCategories();
    }

    render() {
        const { statusCategoryGetAll } = this.props;

        if (statusCategoryGetAll === API_SUCCESS) {
            return (
                <div className='container'>
                    <Header />

                    <div className='main-content'>
                        <Route exact path='/' component={ListPosts} />
                        <Route path='/:category' component={ListPosts} />

                        <ListCategories />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='container-main-loading'>
                    <span>
                        Carregando...
                    </span>
                </div>
            );
        }
    }

    /*
    
    <Route exact path="/" render={() => (
          <Redirect to="/category/all" />
        )}/>

        <Route path="/category/:category" component={HomePage}/>

        <Route path="/post/new/:category?" component={NewPost} />
    */
}

const mapStateToProps = ({ category }) => ({
    statusCategoryGetAll: category.status.getAll
});

const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template));