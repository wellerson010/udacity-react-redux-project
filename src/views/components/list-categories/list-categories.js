import React from 'react';
import { connect } from 'react-redux'; 
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import './list-categories.css';
import { getAll } from '../../../core/category/category-service';
import { addAllCategories } from '../../../core/category/category-actions';

class ListCategories extends React.Component {
    state = {
        loading: true
    }

    async componentDidMount(){
        let categories = await getAll();
        
        this.props.addAllCategories(categories);

        this.setState({
            loading: false
        }); 
    }

    render(){
        const { categories } = this.props;

        return (
            <BlockUi blocking={this.state.loading} className="container-categories">
                <h2>Categories</h2>
                <ul>
                    { 
                        categories.result.categories.map(data => {
                            const category = categories.entities.categories[data];

                            return (
                                <li key={category.name}>
                                    { 
                                        category.name
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </BlockUi>
        )
    }
}

const mapStateToProps = ({category}) => {
    return {
        categories: category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAllCategories: data => dispatch(addAllCategories(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);