import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { API_LOADING } from '../../../core/constants';
import DetailPostComponent from '../../components/detail-post';
import { getAll } from '../../../core/comment/comment-action';

class DetailPost extends React.Component {
    constructor(props) {
        super(props);

        const { match: { params: { post_id } } } = this.props;

        this.state = {
            postId: post_id,
            modalAddOpened: false
        }
    }

    closeModalAdd = () => this.setState({
        modalAddOpened: false
    });

    componentDidMount() {
        this.props.getAll(this.state.postId);
    }

    openModalAdd = () => this.setState({
        modalAddOpened: true
    });

    render() {
        const { statusGetAll, comments, posts } = this.props;

        const { postId, modalAddOpened } = this.state;

        const post = posts[postId];

        const blocking = (statusGetAll === API_LOADING);

        return (
            (post) ?
                <DetailPostComponent
                    loading={blocking}
                    comments={comments}
                    post={post}
                    modalAddOpened={modalAddOpened}
                    handleModalAddClose={this.closeModalAdd}
                    handleModalAddOpen={this.openModalAdd}
                />
                :
                <Redirect
                    to='/'
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