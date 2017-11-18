import React from 'react';
import BlockUi from 'react-block-ui';

import './detail-post.css';
import ContentItem from '../../containers/content-item';
import { COMMENT, POST } from '../../../core/constants';

const DetailPost = ({ loading, comments, post }) => (
    <BlockUi blocking={loading} className='container-detail-post'>
        <ul className='list'>
            <li key={post.id}>
                <ContentItem
                    data={post}
                    type={POST}
                    showBody={true}
                />
            </li>
            {
                comments.ids.map(id => {
                    const comment = comments.data[id];

                    return (
                        <li key={id}>
                            <ContentItem
                                data={comment}
                                type={COMMENT}
                                showBody={true}
                            />
                        </li>
                    )
                })
            }
        </ul>
    </BlockUi>
)

export default DetailPost;