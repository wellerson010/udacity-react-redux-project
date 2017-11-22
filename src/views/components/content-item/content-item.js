import React from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';

import './content-item.css';
import Vote from '../vote';
import { EDIT, POST } from '../../../core/constants';
import EditItem from '../../containers/edit-item';

const ContentItem = ({
    type,
    data,
    votes,
    handleVote,
    handleDelete,
    handleEdit,
    handleModalEditClose,
    modalEditOpened,
    linkToPost,
    showBody
}) => (
        <BlockUi blocking={false} className='content-item'>
            <Rodal visible={modalEditOpened} onClose={handleModalEditClose} height={440}>
                <EditItem
                    mode={EDIT}
                    data={data}
                    type={type}
                    handleCancel={handleModalEditClose}
                />
            </Rodal >

            <div className='date'>
                {formatDate(data.timestamp)}
            </div>
            <div className='info'>
                {
                    (linkToPost) ?
                    <Link to={`/${data.category}/${data.id}`}>
                        {
                            buildTitle(data.title)
                        }
                    </Link>
                    :
                    buildTitle(data.title)
                }
                {
                    showBody &&
                    <div className='body'>
                        { data.body }
                    </div>
                }

                <div className='info'>
                    <div className='data-info' title='Votação'>
                        <FontAwesome name='star' className='star' />
                        {data.voteScore}

                        <Vote
                            handleVote={handleVote}
                            id={data.id}
                            votes={votes}
                        />
                    </div>

                    {
                        type === POST &&
                        <div className='data-info' title='Comentários'>
                            <FontAwesome name='comment-o' />
                            {data.commentCount}
                        </div>
                    }


                    <div className='data-info' title='Autor'>
                        <FontAwesome name='user-o' />
                        {data.author}
                    </div>
                </div>
            </div>
            <div className='actions'>
                <FontAwesome name='pencil' title='Editar' onClick={() => handleEdit(data.id)} />
                <FontAwesome name='trash' title='Deletar' onClick={() => handleDelete(data.id)} />
            </div>
        </BlockUi>
    );

const formatDate = (timestamp) => moment(timestamp).format('DD/MM/YY hh:mm:ss');

const buildTitle = (title) => (
    <div className='title'>
        {title}
    </div>
)

export default ContentItem;