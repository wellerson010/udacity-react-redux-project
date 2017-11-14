import React from 'react';
import BlockUi from 'react-block-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import './list-posts.css';
import { orderAllPosts } from '../../../core/post/post-service';
import { getAllPosts, changeOrderAllPosts } from '../../../core/post/post-actions';
import IconOrder from '../icon-order';

class ListPosts extends React.Component {

    state = {
        loading: true,
        fieldOrder: 'voteScore',
        orderAsc: true
    };

    async componentDidMount() {
        this.props.getAllPosts();
    }

    changeOrder = (field) => {
        let orderAsc = (this.state.fieldOrder === field) ? !this.state.orderAsc : true;

        this.setState({
            fieldOrder: field,
            orderAsc: orderAsc
        }, () => {
            const ids = orderAllPosts(field, orderAsc);
            this.props.changeOrderAllPosts(ids);
        });
    }

    filterPostsByCategory = (posts, category) => posts.ids.reduce((accumulator, value) => {
        const post = posts.data[value];

        if (category == 'all' || post.category === category) {
            accumulator.push(post);
        }

        return accumulator;
    }, []);

    formatDate = (timestamp) => moment(timestamp).format('DD/MMM');

    getStatusToIconOrder = (field) => (field !== this.state.fieldOrder) ? 0 : (this.state.orderAsc) ? 1 : 2;

    getContainerIconsOrder = (iconName, field) => (
        <div className='icons' onClick={() => this.changeOrder(field)}>
            <IconOrder
                iconName={iconName}
                status={this.getStatusToIconOrder(field)}
            />
        </div>
    );

    render() {
        const { posts, categoryFiltered } = this.props;

        const listPosts = this.filterPostsByCategory(posts.all, categoryFiltered);

        return (
            <BlockUi blocking={this.props.loading} className='container-posts'>
                <div className='container-posts-header'>
                    <h2 className='title'>Posts</h2>
                    <button type='button' className='btn-add-post'>Add New</button>
                </div>

                <div className='container-posts-order'>
                    <span className='title'>Order by</span>
                    <div className='options'>
                        {
                            this.getContainerIconsOrder('star-o', 'voteScore')
                        }
                        {
                            this.getContainerIconsOrder('calendar', 'timestamp')
                        }
                        {
                            this.getContainerIconsOrder('comment-o', 'commentCount')
                        }
                    </div>
                </div>
                <ul className='list'>
                    {
                        listPosts.map(post => {
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
                        })
                    }
                </ul>
            </BlockUi>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);