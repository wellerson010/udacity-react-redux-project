import React from 'react';
import { connect } from 'react-redux';

import ContentItemComponent from '../../components/content-item';
import { EDIT, SAVE, COMMENT, POST } from '../../../core/constants';
import { addPost,  deletePost, editPost } from '../../../core/post/post-actions';
import { vote } from '../../../core/vote/vote-actions';

class ContentItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalEditOpened: false
        }
    }

    closeModalEdit = () => this.setState({
        modalEditOpened: false
    })

    openModalEdit = () => this.setState({
        modalEditOpened: true
    })

    render() {
        const { type, data, votes, handleVote, handleDelete, handleSave, linkToPost, showBody } = this.props;
        const { modalEditOpened } = this.state;

        return (
            <ContentItemComponent
                type={type}
                data={data}
                votes={votes}
                handleVote={handleVote}
                handleDelete={handleDelete}
                modalEditOpened={modalEditOpened}
                handleEdit={this.openModalEdit}
                handleModalEditClose={this.closeModalEdit}
                linkToPost={linkToPost}
                showBody={showBody}
            />
        )
    }
}

const mapStateToProps = ({vote}) => ({
    votes: vote
});

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.type == POST) {
        return {
            handleDelete: (data) => dispatch(deletePost(data)),
            handleVote: (postId, option) => dispatch(vote(postId, option, POST))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentItem);