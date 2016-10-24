import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from "react-router";

import routes from "./Routes";
import store from "./store";

let element = document.getElementById('content');
ReactDOM.render((
  <div>
    <Provider store={store} >
        <Router routes={routes} history={browserHistory} />
    </Provider>
  </div>
), element);

document.body.classList.remove('loading');

