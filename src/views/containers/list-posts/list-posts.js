import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeOrderAllPosts, getAllPosts } from '../../../core/post/post-actions';
import { API_LOADING } from '../../../core/constants';
import ListPostsComponent from '../../components/list-posts';

class ListPosts extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            modalAddOpened: false
        }
    }

    closeModalAdd = () => this.setState({
        modalAddOpened: false
    });

    componentDidMount() {
        this.props.getAllPosts();
    }

    filterPostsByCategory = (posts, category) => posts.ids.reduce((accumulator, value) => {
        const post = posts.data[value];

        if (!category || post.category === category) {
            accumulator.push(post);
        }

        return accumulator;
    }, []);

    openModalAdd = () => this.setState({
        modalAddOpened: true
    });

    render() {
        const { posts, 
            statusGetAll, 
            changeOrderAllPosts, 
            fieldOrder,
            orderAsc, 
            match: { params } } = this.props;

        const { modalAddOpened } = this.state;

        const listPosts = this.filterPostsByCategory(posts, params.category);
        const loading = (statusGetAll === API_LOADING) ? true : false;

        return (
            <div className='container-posts'>
                <ListPostsComponent
                    posts={listPosts}
                    loading={loading}
                    fieldOrder={fieldOrder}
                    orderAsc={orderAsc}
                    handleChangeOrder={changeOrderAllPosts}
                    modalAddOpened={modalAddOpened}
                    handleModalAddClose={this.closeModalAdd}
                    handleModalAddOpen={this.openModalAdd}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ post }) => ({
    fieldOrder: post.all.order.fieldOrder,
    orderAsc: post.all.order.orderAsc,
    posts: post.all,
    statusGetAll: post.status.getAll,
    votes: post.vote
});

const mapDispatchToProps = (dispatch) => ({
    changeOrderAllPosts: (data) => dispatch(changeOrderAllPosts(data)),
    getAllPosts: () => dispatch(getAllPosts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));