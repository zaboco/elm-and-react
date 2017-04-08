// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createElmMiddleware, { reducer as elmReducer } from 'redux-elm-middleware';
import appReducers from './reducers';
import { initPosts } from './actions';
import App from './components/app/App';
import Elm from '../elm/reducer.elm';
import './index.css';

const reducer = combineReducers({
  elm: elmReducer,
  app: appReducers,
});

const elmStore = Elm.Reducer.worker();
const { run: runElm, elmMiddleware } = createElmMiddleware(elmStore);

const store = createStore(reducer, {}, applyMiddleware(elmMiddleware));

runElm(store);

setTimeout(fetchPosts, 700);

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
