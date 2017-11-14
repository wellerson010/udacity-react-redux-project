import React from 'react';
import FontAwesome from 'react-fontawesome';

import './icon-order.css';

export default ({iconName, status}) => (
    <div className='icon-order'>
        <FontAwesome name={iconName} />
        {
            status === 1 && <FontAwesome name='chevron-down' className='order'/>
        }
        {
            status === 2 && <FontAwesome name='chevron-up' className='order'/>
        }
    </div>
)