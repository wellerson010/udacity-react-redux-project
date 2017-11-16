import React from 'react';
import BlockUi from 'react-block-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router-dom';

import './list-posts.css';
import { orderAllPosts } from '../../../core/post/post-service';
import { getAllPosts, changeOrderAllPosts } from '../../../core/post/post-actions';
import IconOrder from '../icon-order';

const ListPosts = ({}) => (
    <BlockUi blocking={this.props.loading} className='container-posts'>
        <div className='container-posts-header'>
            <h2 className='title'>Posts</h2>
        </div>

        <div className='container-posts-order'>
            <span className='title'>Order by</span>
            <div className='options'>
                {
                    getContainerIconsOrder('star-o', 'voteScore')
                }
                {
                    getContainerIconsOrder('calendar', 'timestamp')
                }
                {
                    getContainerIconsOrder('comment-o', 'commentCount')
                }
            </div>
        </div>
        <ul className='list'>
            {
            /*    listPosts.map(post => {
                    return (
                        <li key={post.id}>
                            <div className='date'>
                                {this.formatDate(post.timestamp)}
                            </div>
                            <div className='vote'>
                                <FontAwesome name='star' />
                                {post.voteScore}
                            </div>
                            {post.title}
                        </li>
                    )
                }) */
            }
        </ul>
    </BlockUi>
);

const getContainerIconsOrder = (iconName, field, status, changeOrder) => (
    <div className='icons' onClick={() => changeOrder(field)}>
        <IconOrder
            iconName={iconName}
            status={status}
        />
    </div>
);

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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));