import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ListPostsComponent from '../../components/list-posts';

class ListPosts extends React.Component {
/*
state = {
        loading: true,
        fieldOrder: 'voteScore',
        orderAsc: true
    };

    async componentDidMount() {
        this.props.getAllPosts();
    }

    addNew = () => {
        const { history, match: {params} } = this.props;
        
        const category = (params.category === 'all')?'':params.category;

        history.push(`/post/new/${category}`);
    }

    changeOrder = (field) => {
        let orderAsc = (this.state.fieldOrder === field) ? !this.state.orderAsc : true;

        this.setState({
            fieldOrder: field,
            orderAsc: orderAsc
        }, () => {
            const ids = orderAllPosts(field, orderAsc);
            this.props.changeOrderAllPosts(ids);
        });
    }

    filterPostsByCategory = (posts, category) => posts.ids.reduce((accumulator, value) => {
        const post = posts.data[value];

        if (category === 'all' || post.category === category) {
            accumulator.push(post);
        }

        return accumulator;
    }, []);

    formatDate = (timestamp) => moment(timestamp).format('DD/MMM');

    getStatusToIconOrder = (field) => (field !== this.state.fieldOrder) ? 0 : (this.state.orderAsc) ? 1 : 2;

    getContainerIconsOrder = (iconName, field) => (
        <div className='icons' onClick={() => this.changeOrder(field)}>
            <IconOrder
                iconName={iconName}
                status={this.getStatusToIconOrder(field)}
            />
        </div>
    );
*/

/* const { posts, match: {params} } = this.props;

        const listPosts = this.filterPostsByCategory(posts.all, params.category);*/

    render (){
        return (
            <div className='container-posts'>
                <ListPostsComponent />
                aaa
            </div>
        );
    }
}

export default withRouter(connect()(ListPosts));