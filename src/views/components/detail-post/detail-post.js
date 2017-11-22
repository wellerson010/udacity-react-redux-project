import React from 'react';
import BlockUi from 'react-block-ui';
import Rodal from 'rodal';

import './detail-post.css';
import ContentItem from '../../containers/content-item';
import { COMMENT, POST, SAVE } from '../../../core/constants';
import EditItem from '../../containers/edit-item';

const DetailPost = ({ loading, comments, post, modalAddOpened, handleModalAddClose, handleModalAddOpen }) => (
    <BlockUi blocking={loading} className='container-detail-post'>
        <button type='button' className='button-new-comment' onClick={handleModalAddOpen}>Novo comentário</button>

        <Rodal visible={modalAddOpened} onClose={handleModalAddClose} height={440}>
            <EditItem
                mode={SAVE}
                type={COMMENT}
                handleCancel={handleModalAddClose}
                postParentId={post.id}
            />
        </Rodal >

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