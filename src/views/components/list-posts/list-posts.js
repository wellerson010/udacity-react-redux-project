import React from 'react';
import BlockUi from 'react-block-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router-dom';

import './list-posts.css';
import IconOrder from '../icon-order';

const ListPosts = ({ loading, posts, fieldOrder, orderAsc, changeOrder }) => (
    <BlockUi blocking={loading} className='container-posts'>
        <div className='container-posts-header'>
            <h2 className='title'>Posts</h2>
        </div>

        <div className='container-posts-order'>
            <span className='title'>Order by</span>
            <div className='options'>
                {
                    getContainerIconsOrder('star-o', 
                    'voteScore',
                    getStatusToIconOrder('voteScore', fieldOrder, orderAsc),
                    changeOrder)
                }
                {
                    getContainerIconsOrder('calendar',
                    'timestamp',
                    getStatusToIconOrder('timestamp', fieldOrder, orderAsc),
                    changeOrder)
                }
                {
                    getContainerIconsOrder('comment-o',
                    'commentCount',
                    getStatusToIconOrder('commentCount', fieldOrder, orderAsc),
                    changeOrder)
                }
            </div>
        </div>
        <ul className='list'>
            {
                posts.map(post => {
                    return (
                        <li key={post.id}>
                            <div className='date'>
                                {formatDate(post.timestamp)}
                            </div>
                            <div className='vote'>
                                <FontAwesome name='star' />
                                {post.voteScore}
                            </div>
                            {post.title}
                        </li>
                    )
                }) 
            }
        </ul>
    </BlockUi>
);

const formatDate = (timestamp) => moment(timestamp).format('DD/MM/YY hh:mm:ss');

const getContainerIconsOrder = (iconName, field, status, changeOrder) => (
    <div className='icons' onClick={() => changeOrder(field)}>
        <IconOrder
            iconName={iconName}
            status={status}
        />
    </div>
);

const getStatusToIconOrder = (field, fieldOrder, orderAsc) => (field !== fieldOrder) ? 0 : (orderAsc) ? 1 : 2;

/*

import { orderAllPosts } from '../../../core/post/post-service';
import { getAllPosts, changeOrderAllPosts } from '../../../core/post/post-actions';

const mapStateToProps = ({ post }) => {
    return {
        posts: post,
        loading: post.loading.getAll
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: data => dispatch(getAllPosts(data)),
        changeOrderAllPosts: data => dispatch(changeOrderAllPosts(data))
    }
} */

export default ListPosts;