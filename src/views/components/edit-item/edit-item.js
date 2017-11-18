import React from 'react';

import './edit-item.css';
import { SAVE } from '../../../core/constants';

const EditItem = ({ title, body, mode, handleChange, handleSave, handleCancel }) => (
    <div className='edit-item'>
        <div>
            <label className='field'>
                <span className='block'>Título</span>
                <input className='input-title' onChange={handleChange} value={title} name='title' />
            </label>
        </div>
        <div>
            <label className='field'>
                <span className='block'>Mensagem</span>
                <textarea onChange={handleChange} value={body} name='body'></textarea>
            </label>
        </div>

        <button type="button" onClick={handleSave}>
            {(mode == SAVE) ? 'Publicar' : 'Salvar'}
        </button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
    </div>
);

export default EditItem;