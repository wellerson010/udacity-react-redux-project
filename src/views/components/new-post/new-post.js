import React from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';

import './new-post.css';
import { getAllCategories } from '../../../core/category/category-actions';
import { capitalizeWord } from '../../../core/utils';

class NewPost extends React.Component {
    state = {
        author: '',
        title: '',
        body: '',
        initialCategory: '',
        category: ''
    }

    addPost = () => {
        const {author, title, body, category} = this.state;
        if (!author.trim() || !title.trim() || !body.trim() || !category.trim()){
            
        }
    }

    componentDidMount() {
        this.props.getAllCategories();
    }


    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        const showDropdownCategories = (!this.props.initialCategory);
        const { categories, match: { params } } = this.props;

        return (
            <BlockUi blocking={this.props.loadingGetAll || this.props.loadingSavePost} className='container-new-post'>
                {
                    showDropdownCategories &&
                    <div>
                        <label className='field'>
                            <span className='inline'>Category</span>
                            <select className='categories' value={this.state.category} onChange={this.handle} name='category'>
                                {
                                    categories.all.ids.map(id => {
                                        const category = categories.all.data[id];

                                        return (
                                            <option
                                                value={id}
                                                key={id}>
                                                {capitalizeWord(category.name)}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </label>
                    </div>
                }

                <div>
                    <label className='field'>
                        <span className='inline'>Author</span>
                        <input onChange={this.handle} value={this.state.author} name='author'/>
                    </label>
                </div>
                <div>
                    <label className='field'>
                        <span className='block'>Title</span>
                        <input className='input-title' onChange={this.handle}  value={this.state.title} name='title'/>
                    </label>
                </div>
                <div>
                    <label className='field'>
                        <span className='block'>Body</span>
                        <textarea onChange={this.handle}  value={this.state.body} name='body'></textarea>
                    </label>
                </div>
                <button type="button" onClick={this.addPost}>Post</button>
            </BlockUi>
        );
    }
}

const mapStateToProps = ({ category }) => {
    return {
        categories: category,
        loadingGetAll: category.loading.getAll,
        loadingSavePost: category.loading.SavePost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);