import React from 'react';
import BlockUi from 'react-block-ui';
import { NavLink } from 'react-router-dom';

import './list-posts.css';
import ContentItem from '../../containers/content-item';
import IconOrder from '../icon-order';
import EditItem from '../edit-item';
import { EDIT, POST } from '../../../core/constants';

const ListPosts = ({
    loading,
    posts,
    fieldOrder,
    orderAsc,
    handleChangeOrder
}) => (
        <BlockUi blocking={loading} className='container-posts'>

            <div className='container-posts-header'>
                <h2 className='title'>Posts</h2>
            </div>

            <div className='container-posts-order'>
                <span className='title'>Ordenar por</span>
                <div className='options'>
                    {
                        getContainerIconsOrder('star-o',
                            'voteScore',
                            getStatusToIconOrder('voteScore', fieldOrder, orderAsc),
                            'Mais votados',
                            handleChangeOrder)
                    }
                    {
                        getContainerIconsOrder('calendar',
                            'timestamp',
                            getStatusToIconOrder('timestamp', fieldOrder, orderAsc),
                            'Data de criação',
                            handleChangeOrder)
                    }
                    {
                        getContainerIconsOrder('comment-o',
                            'commentCount',
                            getStatusToIconOrder('commentCount', fieldOrder, orderAsc),
                            'Total de comentários',
                            handleChangeOrder)
                    }
                </div>
            </div>
            <ul className='list'>
                {
                    posts.map(post => {
                        return (
                            <li key={post.id} className='post'>
                                <ContentItem
                                    type={POST}
                                    data={post}
                                    mode={EDIT}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </BlockUi>
    );



const getContainerIconsOrder = (iconName, field, status, title, changeOrder) => (
    <div className='icons' onClick={() => changeOrder(field)} title={title}>
        <IconOrder
            iconName={iconName}
            status={status}
        />
    </div>
);

const getStatusToIconOrder = (field, fieldOrder, orderAsc) => (field !== fieldOrder) ? 0 : (orderAsc) ? 1 : 2;

export default ListPosts;