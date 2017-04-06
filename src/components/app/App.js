// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import PostList from '../post/PostList';

import './App.css';

const posts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Some posts</h2>
        </div>
        <div className="App-body">
          <PostList posts={posts} />
        </div>
      </div>
    );
  }
}

export default App;
