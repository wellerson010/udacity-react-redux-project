import NormalizeUrl from 'normalize-url';
import { generateUiid } from './utils';

import Config from './config';

export default async function request({ url, method = 'GET', data = null }){
    const params = {
        method,
        headers: {
            'Authorization': getAuthorizationValue(),
            'Content-Type': 'application/json'
        },
    };

    if (data){
        params['body'] = JSON.stringify(data);
    }

    const response = await fetch(normalizeUrl(url), params);
    return response.json();
}

function getAuthorizationValue(){
    const localStorageAuthorization = localStorage.getItem('authorization');

    if (localStorageAuthorization){
        return localStorageAuthorization;
    }

    const authorizationUid = generateUiid();
    localStorage.setItem('authorization', authorizationUid);

    return authorizationUid;
}

function normalizeUrl(url){
    return NormalizeUrl(`${Config.api.url}/${url}`);
}