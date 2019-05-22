import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/less/icon.less'

import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import {
  Provider,
} from 'react-keep-alive';

// import { Provider } from 'react-redux';
// import configureStore from './redux/store'
// const store = configureStore();

ReactDOM.render(
        <Provider>
            <Router />
        </Provider>,
        document.getElementById('root')
    );
registerServiceWorker();
