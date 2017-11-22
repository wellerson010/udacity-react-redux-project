import React from 'react';

import './edit-item.css';
import { SAVE, POST } from '../../../core/constants';
import { capitalizeWord } from '../../../core/utils';

const EditItem = ({ title, body, author, category, categories, mode, type, handleChange, handleSave, handleCancel }) => (
    <div className='container-edit-item'>
        {
            mode == SAVE &&
            <div>
                <label className='field'>
                    <span className='inline'>Autor</span>
                    <input onChange={handleChange} value={author} name='author' />
                </label>
            </div>
        }
        {
            (mode == SAVE && type == POST) &&
            <label className='field'>
                <span className='inline'>Categoria</span>
                <select className='categories' value={category} onChange={handleChange} name='category'>
                    <option value='any'>
                        Selecione uma categoria...
                    </option>
                    {
                        categories.ids.map(id => {
                            const category = categories.data[id];

                            return (
                                <option
                                    value={id}
                                    key={id}>
                                    {capitalizeWord(category.name)}
                                </option>
                            );
                        })
                    }
                </select>
            </label>
        }
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