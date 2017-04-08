// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducers from './reducers';
import App from './components/app/App';
import type { AppState } from './types';
import './index.css';

const appState: AppState = {
  selectedPostId: 2,
  posts: [
    { id: 1, title: 'Post 1', votes: 2 },
    { id: 2, title: 'Post 2', votes: 0 },
    { id: 3, title: 'Post 3', votes: 0 },
  ],
};

const store = createStore(appReducers, appState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
