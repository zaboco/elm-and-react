import { connect } from 'react-redux';
import { selectPost, changePostVotes } from '../actions';
import PostList from './post/PostList';

const mapStateToProps = state => state.elm;

const mapDispatchToProps = {
  onPostSelect: selectPost,
  onPostVotesChange: changePostVotes,
};

const PostListElmContainer = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListElmContainer;
