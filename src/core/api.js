import NormalizeUrl from 'normalize-url';

import Config from './config';

export default async function request({ url, method = 'GET' }){

    const response = await fetch(normalizeUrl(url), {
        method,
        headers: {
            'Authorization': 'udacity-react-2017'
        }
    });
    return response.json();
}

function normalizeUrl(url){
    return NormalizeUrl(`${Config.api.url}/${url}`);
}