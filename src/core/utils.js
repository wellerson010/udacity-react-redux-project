import uuid from 'uuid/v1';

export function orderByState(data, field, asc = true){
    return data.ids.sort((idA, idB) => {
        const valueA = data.data[idA][field];
        const valueB = data.data[idB][field];

        const result = (valueA > valueB) ? 1: (valueA < valueB) ? -1: 0; 

        return (asc) ? result: result * -1;
    });
}

export function capitalizeWord(word){
    return word.replace(/\b\w/g, l => l.toUpperCase());
}

export function generateUiid(){
    return uuid();
}

export function normalizeData(data, options = {}){
    const attributeId = (options.attributeId || 'id');

    const dataNormalized = data.reduce((accumulator, value) => {
        const id = value[attributeId];

        accumulator.ids.push(id);
        accumulator.data[id] = value;

        return accumulator;
    }, {
        ids: [],
        data: {}
    });

    return dataNormalized;
}