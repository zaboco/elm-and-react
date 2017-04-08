// @flow

import { TYPES } from './actions';
import type { Action } from './actions';
import type { PostType, AppState } from './types';

const postReducer = (state: PostType, action: Action): PostType => {
  switch (action.type) {
    case TYPES.CHANGE_VOTES:
      return { ...state, votes: state.votes + action.delta };
    default:
      return state;
  }
};

const postsReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case TYPES.CHANGE_VOTES:
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.id ? postReducer(post, action) : post),
      };
    case TYPES.SELECT_POST:
      return { ...state, selectedPostId: action.id };
    default:
      return state;
  }
};

export default postsReducer;
