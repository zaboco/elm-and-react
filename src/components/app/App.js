// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import PostList from '../post/PostList';
import type { PostParamsArray } from '../post/PostList';
import './App.css';

const posts: PostParamsArray = [
  { id: 1, title: 'Post 1', votes: 0 },
  { id: 2, title: 'Post 2', votes: 0 },
  { id: 3, title: 'Post 3', votes: 0 },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Some posts</h2>
        </div>
        <div className="App-body">
          <PostList
            posts={posts}
            onPostVotesChange={(id, delta) => {
              console.log(`Post ${id} votes changed by ${delta}`);
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
