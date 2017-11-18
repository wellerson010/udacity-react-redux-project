import React from 'react';

import EditItemComponent from '../../components/edit-item';

export default class EditItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: ''
        }
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render (){
        const { handleCancel } = this.props;

        return (
            <EditItemComponent 
                handleCancel={handleCancel}
                handleChange={this.handle}
                title={this.state.title}
                body={this.state.body}
            />
        )
    }
}