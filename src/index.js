import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Template from './views/containers/template';
import registerServiceWorker from './registerServiceWorker';
import store from './core/store';

ReactDOM.render(<BrowserRouter>
    <Provider  store={store}>
        <Template />
    </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
