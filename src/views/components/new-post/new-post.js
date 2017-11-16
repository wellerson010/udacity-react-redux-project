import React from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import alert from 'sweetalert';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './new-post.css';
import { getAllCategories } from '../../../core/category/category-actions';
import { resetStatusPostSave, savePost } from '../../../core/post/post-actions';
import { capitalizeWord } from '../../../core/utils';
import { API_LOADING, API_SUCCESS, API_IDLE, API_FAIL } from '../../../core/constants';

class NewPost extends React.Component {

    constructor(props) {
        super(props);

        const { match: { params } } = props;

        this.state = {
            author: '',
            title: '',
            body: '',
            initialCategory: params.category,
            category: (params.category) ? params.category : ''
        }
    }



    addPost = () => {
        const { author, title, body, category } = this.state;
        if (!author.trim() || !title.trim() || !body.trim() || !category.trim()) {
            alert('Erro!', 'Por favor, preencha todos os campos!', 'error');
            return;
        }

        this.props.savePost({
            author,
            title,
            body,
            category
        });
    }

    cancel = () => {
        const { history } = this.props;

        history.goBack();
    }

    componentDidMount() {
        if (this.shouldGetCategories()) {
            this.props.getAllCategories();
        }
    }

    componentWillUnmount() {
        this.props.resetStatusPostSave();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.all.ids.length > 0 && !this.state.category) {
            const categoryId = nextProps.categories.all.ids[0];

            this.setState({
                category: nextProps.categories.all.data[categoryId].name
            });
        }
    }

    handle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    shouldGetCategories = () => {
        return (!this.state.initialCategory);
    }

    render() {
        const showDropdownCategories = this.shouldGetCategories();
        const { categories, statusSavePost } = this.props;

        if (statusSavePost == API_SUCCESS) {
            return (
                <Redirect to={`/category/${this.state.category}`} />
            )
        }

        return (
            <BlockUi blocking={this.props.loadingGetAll || statusSavePost == API_LOADING} className='container-new-post'>
                {
                    showDropdownCategories &&
                    <div>
                        <label className='field'>
                            <span className='inline'>Categoria</span>
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
                        <span className='inline'>Autor</span>
                        <input onChange={this.handle} value={this.state.author} name='author' />
                    </label>
                </div>
                <div>
                    <label className='field'>
                        <span className='block'>Título</span>
                        <input className='input-title' onChange={this.handle} value={this.state.title} name='title' />
                    </label>
                </div>
                <div>
                    <label className='field'>
                        <span className='block'>Mensagem</span>
                        <textarea onChange={this.handle} value={this.state.body} name='body'></textarea>
                    </label>
                </div>
                <button type="button" onClick={this.addPost}>Publicar</button>
                <button type="button" onClick={this.cancel}>Cancel</button>
            </BlockUi>
        );
    }
}

const mapStateToProps = ({ category, post }) => {
    return {
        categories: category,
        loadingGetAll: category.loading.getAll,
        statusSavePost: post.status.savePost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        resetStatusPostSave: () => dispatch(resetStatusPostSave()),
        savePost: (data) => dispatch(savePost(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));