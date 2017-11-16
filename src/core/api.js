import NormalizeUrl from 'normalize-url';

import Config from './config';

export default async function request({ url, method = 'GET', data = null }){
    const params = {
        method,
        headers: {
            'Authorization': 'udacity-react-2017',
            'Content-Type': 'application/json'
        },
    };

    if (data){
        params['body'] = JSON.stringify(data);
    }

    const response = await fetch(normalizeUrl(url), params);
    return response.json();
}

function normalizeUrl(url){
    return NormalizeUrl(`${Config.api.url}/${url}`);
}