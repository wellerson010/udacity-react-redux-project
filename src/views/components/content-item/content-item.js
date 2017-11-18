import React from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

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
    modalEditOpened
}) => (
    <div className='content-item'>
        <Rodal visible={modalEditOpened} onClose={handleModalEditClose} height={440}>
            <EditItem 
                mode={EDIT}
                data={data}
                type={type}
                handleCancel= {handleModalEditClose}
            />
        </Rodal >

        <div className='date'>
            {formatDate(data.timestamp)}
        </div>
        <div className='info'>
            <div className='title'>
                {data.title}
            </div>

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
                <FontAwesome name='pencil' title='Editar' onClick={() => handleEdit(data.id)}/>
                <FontAwesome name='trash' title='Deletar' onClick={() => handleDelete(data.id)}/>
            </div>
    </div>
);

const formatDate = (timestamp) => moment(timestamp).format('DD/MM/YY hh:mm:ss');

export default ContentItem;