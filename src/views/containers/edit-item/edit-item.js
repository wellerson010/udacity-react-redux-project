import React from 'react';
import { connect } from 'react-redux';
import Sweet from 'sweetalert';

import EditItemComponent from '../../components/edit-item';
import { EDIT, POST } from '../../../core/constants';
import { addPost, editPost } from '../../../core/post/post-actions';

class EditItem extends React.Component {
    constructor(props){
        super(props);

        const { mode, data } = props;

        this.state = {
            title: (mode == EDIT)?data.title:'',
            body: (mode == EDIT)?data.body:'',
            category: 'any',
            author: ''
        }
    }

    alertFillFields(){
        Sweet({
            icon: 'error',
            title: 'Por favor, preenchar todos os campos!',
            text: 'Precisamos de todos os campos preenchidos :D'
        })
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    save = () => {
        const { handleSave, data, mode } = this.props;
        const { title, body, category, author } = this.state;

        if (mode == EDIT){

            if (!title.trim() || !body.trim()){
                this.alertFillFields();
                return;
            }

            handleSave({
                id: data.id,
                title,
                body
            });
        }
        else{
            if (!title.trim() || !body.trim() || !author.trim() || category == 'any'){
                this.alertFillFields();
                return;
            }

            handleSave({
                title,
                body,
                category,
                author
            });
        }
    } 

   

    render (){
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
                author={author}
                category={category}
                categories={categories}
            />
        )
    }
}

const mapStateToProps = ({post, category}) => ({
    categories: category.all
})

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.type == POST){
        const saveCallback = (ownProps.mode == EDIT) ? editPost: addPost;

        return {
            handleSave: (data) => dispatch(saveCallback(data))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditItem);