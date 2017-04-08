// @flow

import { connect } from 'react-redux';
import { selectPost, changePostVotes } from '../actions';
import PostList from './post/PostList';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  onPostSelect: selectPost,
  onPostVotesChange: changePostVotes,
};

const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListContainer;
