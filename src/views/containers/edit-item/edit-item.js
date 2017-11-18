import React from 'react';

import EditItemComponent from '../../components/edit-item';
import { EDIT, POST } from '../../../core/constants';

export default class EditItem extends React.Component {
    constructor(props){
        super(props);

        const { mode, data } = props;

        this.state = {
            title: (mode == EDIT)?data.title:'',
            body: (mode == EDIT)?data.body:''
        }
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSave = () => {
        const { handleSave, data } = this.props;

        handleSave(data.id, this.state.title, this.state.body);
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