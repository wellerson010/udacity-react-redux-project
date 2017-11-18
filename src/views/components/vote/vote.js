import React from 'react';
import FontAwesome from 'react-fontawesome';

import './vote.css';
import { DOWN_VOTE, UP_VOTE } from '../../../core/constants';

const Vote = ({ id, votes, handleVote }) => (
    <div className='container-vote'>
        <FontAwesome
            name='chevron-up'
            className={getClassName(id, UP_VOTE, votes)}
            title='Gostei'
            onClick={() => handleVote(id, UP_VOTE)}
        />
        <FontAwesome
            name='chevron-down'
            className={getClassName(id, DOWN_VOTE, votes)}
            title='Não gostei'
            onClick={() => handleVote(id, DOWN_VOTE)}
        />
    </div>
);

const getClassName = (id, type, votes) => `vote${((votes[id] === type)?' active':'')}`;

export default Vote;