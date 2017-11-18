import React from 'react';
import { connect } from 'react-redux';

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
            category: '',
            author: ''
        }
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSave = () => {
        const { handleSave, data, mode } = this.props;
        const { title, body, category, author } = this.state;

        if (mode == EDIT){
            handleSave({
                id: data.id,
                title,
                body
            });
        }
        else{
            handleSave({
                title,
                body,
                category,
                author
            });
        }
       
    }

    render (){
        const { handleCancel, data, mode, type } = this.props;

        return (
            <EditItemComponent 
                handleCancel={handleCancel}
                handleChange={this.handle}
                handleSave={this.handleSave}
                title={this.state.title}
                body={this.state.body}
            />
        )
    }
}

const mapStateToProps = () => ({
    
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