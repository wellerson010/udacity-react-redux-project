import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { API_LOADING } from '../../../core/constants';
import DetailPostComponent from '../../components/detail-post';
import { getAll } from '../../../core/comment/comment-action';

class DetailPost extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params: { post_id } }, getAll } = this.props;

        this.state = {
            postId: post_id
        }
    }

    componentDidMount() {
        this.props.getAll(this.state.postId);
    }

    render() {
        const { statusGetAll, comments, posts } = this.props;

        const { postId } = this.state;

        const post = posts[postId];
        
        const blocking = (statusGetAll == API_LOADING);

        return (
            <DetailPostComponent
                loading={blocking}
                comments={comments}
                post={post}
            />
        )
    }
}

const mapStateToProps = ({ comment, post }) => ({
    comments: comment.all,
    posts: post.all.data,
    statusGetAll: comment.status.getAll
});

const mapDispatchToProps = (dispatch) => ({
    getAll: (data) => dispatch(getAll(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPost));