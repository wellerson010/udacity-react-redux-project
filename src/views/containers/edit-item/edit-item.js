import React from 'react';
import { connect } from 'react-redux';
import Sweet from 'sweetalert';

import EditItemComponent from '../../components/edit-item';
import { EDIT, POST } from '../../../core/constants';
import { addPost, editPost } from '../../../core/post/post-actions';
import { addComment, editComment } from '../../../core/comment/comment-action';

class EditItem extends React.Component {
    constructor(props) {
        super(props);

        const { mode, data } = props;

        this.state = {
            title: (mode == EDIT) ? data.title : '',
            body: (mode == EDIT) ? data.body : '',
            category: 'any',
            author: ''
        }
    }

    add() {
        const { title, body, category, author } = this.state;
        const { type, handleSave, postParentId } = this.props;

        if (!body.trim() || !author.trim() || (type == POST && (category == 'any' || !title.trim()))) {
            this.alertFillFields();
            return;
        }

        handleSave({
            title,
            body,
            category,
            author,
            parentId: postParentId
        });
    }

    alertFillFields() {
        Sweet({
            icon: 'error',
            title: 'Por favor, preenchar todos os campos!',
            text: 'Precisamos de todos os campos preenchidos :D'
        })
    }

    edit = () => {
        const { handleSave, data, mode } = this.props;
        const { title, body } = this.state;


        if (!body.trim() || (mode == POST && !title.trim())) {
            this.alertFillFields();
            return;
        }

        handleSave({
            id: data.id,
            title,
            body
        });
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    save = () => {
        const {  mode } = this.props;

        if (mode == EDIT) {
            this.edit();
        }
        else {
            this.add();
        }
    }



    render() {
        const { handleCancel, data, mode, type, categories } = this.props;

        const { title, body, author, category } = this.state;

        return (
            <EditItemComponent
                handleCancel={handleCancel}
                handleChange={this.handle}
                handleSave={this.save}
                title={title}
                body={body}
                mode={mode}
                type={type}
                author={author}
                category={category}
                categories={categories}
            />
        )
    }
}

const mapStateToProps = ({ post, category }) => ({
    categories: category.all
})

const mapDispatchToProps = (dispatch, ownProps) => {
    let saveAction;

    if (ownProps.type == POST) {
        saveAction = (ownProps.mode == EDIT) ? editPost : addPost;
    }
    else {
        saveAction = (ownProps.mode == EDIT) ? editComment : addComment;
    }

    return {
        handleSave: (data) => dispatch(saveAction(data))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditItem);