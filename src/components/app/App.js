// @flow

import React, { Component } from 'react';
import Elm from 'react-elm-components';
import { Posts } from '../../../elm/posts.elm';

import logo from './logo.svg';
import PostListContainer from '../PostListContainer';
import './App.css';

const PAGES = ['React & Redux', 'Elm'];
const [REACT_REDUX, ELM] = PAGES;

const navItemClass = selected => selected ? 'App-nav-item selected' : 'App-nav-item';

const Nav = ({ pages, selectedPage, onChange }) => (
  <div className="App-nav">
    {pages.map(page => (
      <div
        key={page}
        className={navItemClass(page === selectedPage)}
        onClick={() => onChange(page)}
      >
        {page}
      </div>
    ))}
  </div>
);

const AppBody = ({ page }) => {
  switch (page) {
    case REACT_REDUX:
      return <PostListContainer />;
    case ELM:
      return <Elm src={Posts} />;
    default:
      return <div>Not Found</div>;
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: ELM,
    };
  }
  render() {
    const { page } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Posts from {page}</h2>
        </div>
        <Nav pages={PAGES} onChange={page => this.setState({ page })} selectedPage={page} />
        <div className="App-body">
          <AppBody page={page} />
        </div>
      </div>
    );
  }
}

export default App;
