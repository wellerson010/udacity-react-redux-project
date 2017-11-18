import React from 'react';
import BlockUi from 'react-block-ui';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';

import './list-posts.css';
import IconOrder from '../icon-order';
import Vote from '../vote';

const ListPosts = ({ loading, posts, fieldOrder, orderAsc, votes, handleChangeOrder, handleVote }) => (
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
                            <NavLink to='/'>
                                <div className='date'>
                                    {formatDate(post.timestamp)}
                                </div>
                                <div>
                                    <div className='title'>
                                        {post.title}
                                    </div>
                                    <div className='info'>
                                        <div className='data-info' title='Votação'>
                                            <FontAwesome name='star' className='star' />
                                            {post.voteScore}

                                            <Vote 
                                                handleVote={handleVote}
                                                id={post.id}
                                                votes={votes}
                                            />
                                        </div>

                                        <div className='data-info' title='Comentários'>
                                            <FontAwesome name='comment-o' />
                                            {post.commentCount}
                                        </div>

                                        <div className='data-info' title='Autor'>
                                            <FontAwesome name='user-o' />
                                            {post.author}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    </BlockUi>
);

const formatDate = (timestamp) => moment(timestamp).format('DD/MM/YY hh:mm:ss');

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