// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducers from './reducers';
import { initPosts } from './actions';
import App from './components/app/App';
import './index.css';

const store = createStore(appReducers, {});

setTimeout(fetchPosts, 0);

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts?_start=4&_end=8')
    .then(res => res.json())
    .then(posts => store.dispatch(initPosts(posts)));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
