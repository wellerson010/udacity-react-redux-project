import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeOrderAllPosts, getAllPosts, votePost } from '../../../core/post/post-actions';
import { API_LOADING } from '../../../core/constants';
import ListPostsComponent from '../../components/list-posts';

class ListPosts extends React.Component {
    
    componentDidMount() {
        this.props.getAllPosts();
    }

    /*
        addNew = () => {
            const { history, match: {params} } = this.props;
            
            const category = (params.category === 'all')?'':params.category;
    
            history.push(`/post/new/${category}`);
        }
    
    */

    filterPostsByCategory = (posts, category) => posts.ids.reduce((accumulator, value) => {
        const post = posts.data[value];

        if (!category || post.category === category) {
            accumulator.push(post);
        }

        return accumulator;
    }, []);

    componentWillReceiveProps(){
        console.log(arguments);
    }

    render() {
        const { posts, statusGetAll, changeOrderAllPosts, fieldOrder, orderAsc, votePost, match: { params } } = this.props;
        const listPosts = this.filterPostsByCategory(posts, params.category);
        const loading = (statusGetAll === API_LOADING) ? true : false;

        return (
            <div className='container-posts'>
                <ListPostsComponent
                    posts={listPosts}
                    loading={loading}
                    fieldOrder={fieldOrder}
                    orderAsc={orderAsc}
                    handleChangeOrder={changeOrderAllPosts}
                    handleVote={votePost}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ post }) => ({
    statusGetAll: post.status.getAll,
    posts: post.all,
    fieldOrder: post.all.order.fieldOrder,
    orderAsc: post.all.order.orderAsc
});

const mapDispatchToProps = (dispatch) => ({
    changeOrderAllPosts: (data) => dispatch(changeOrderAllPosts(data)),
    getAllPosts: () => dispatch(getAllPosts()),
    votePost: (postId, option) => dispatch(votePost(postId, option))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));