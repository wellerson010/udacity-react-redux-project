import React from 'react';
import { connect } from 'react-redux';
import Sweet from 'sweetalert';

import ContentItemComponent from '../../components/content-item';
import { POST } from '../../../core/constants';
import { deletePost } from '../../../core/post/post-actions';
import { deleteComment } from '../../../core/comment/comment-action';
import { vote } from '../../../core/vote/vote-actions';

class ContentItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalEditOpened: false
        }
    }

    calculateHeightModalEdit = () => {
        return (this.props.type === POST)? 335: 285;
    }

    closeModalEdit = () => this.setState({
        modalEditOpened: false
    })

    confirmDelete = (id) => {
        Sweet({
            title: 'Você está certo disso?',
            text: 'Não será possível desfazer esta ação!',
            icon: 'warning',
            buttons: {
                confirm: {
                    text: 'Sim, deletar!',
                    value: true
                },
                cancel: {
                    text: 'Cancelar',
                    closeModal: true,
                    value: false,
                    visible: true
                }
            }
        }).then(result => {
            if (result){
                this.props.handleDelete(id);
            }
        });
    }

    openModalEdit = () => this.setState({
        modalEditOpened: true
    })

    render() {

        const { type, data, votes, handleVote, linkToPost, showBody } = this.props;
        const { modalEditOpened } = this.state;

        return (
            <ContentItemComponent
                type={type}
                data={data}
                votes={votes}
                handleVote={handleVote}
                handleDelete={this.confirmDelete}
                modalEditOpened={modalEditOpened}
                handleEdit={this.openModalEdit}
                handleModalEditClose={this.closeModalEdit}
                linkToPost={linkToPost}
                showBody={showBody}
                heightModalEdit={this.calculateHeightModalEdit()}
            />
        )
    }
}

const mapStateToProps = ({vote}) => ({
    votes: vote
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const deleteAction = (ownProps.type === POST) ? deletePost: deleteComment;

    return {
        handleDelete: (data) => dispatch(deleteAction(data)),
        handleVote: (postId, option) => dispatch(vote(postId, option, ownProps.type))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentItem);