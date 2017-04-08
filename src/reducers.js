// @flow

import { TYPES } from './actions';
import type { Action } from './actions';
import type { AppState } from './types';

const changeVotesBy = delta =>
  post => ({
    ...post,
    votes: post.votes + delta,
  });

const updatePostWithId = (posts, id, postUpdater) =>
  posts && posts.map(post => post.id === id ? postUpdater(post) : post);

const postsReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case TYPES.CHANGE_VOTES:
      return {
        ...state,
        posts: updatePostWithId(state.posts, action.id, changeVotesBy(action.delta)),
      };
    case TYPES.SELECT_POST:
      return { ...state, selectedPostId: action.id };
    case TYPES.INIT_POSTS:
      const newPosts = action.posts.map(post => ({ ...post, votes: 0 }));
      const seletedPost = newPosts[0] || { id: null };
      return { ...state, posts: newPosts, selectedPostId: seletedPost.id };
    default:
      return state;
  }
};

export default postsReducer;
