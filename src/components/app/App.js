// @flow

import React, { Component } from 'react';
import Elm from 'react-elm-components';
import { Posts } from '../../../elm/posts.elm';

import logo from './logo.svg';
import PostListContainer from '../PostListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Posts from React</h2>
        </div>
        <div className="App-body">
          <PostListContainer />
          <Elm src={Posts} />
        </div>
      </div>
    );
  }
}

export default App;
