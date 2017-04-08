// @flow

import type { PostArrayType } from './types';

export const TYPES = {
  SELECT_POST: 'SELECT_POST',
  CHANGE_VOTES: 'CHANGE_VOTES',
  INIT_POSTS: 'INIT_POSTS',
};

type SelectPostAction = { type: typeof TYPES.SELECT_POST, payload: { id: number } };
type ChangeVotesAction = {
  type: typeof TYPES.CHANGE_VOTES,
  payload: { id: number, delta: number },
};
type InitPostsAction = { type: typeof TYPES.INIT_POSTS, payload: { posts: PostArrayType } };
export type Action = SelectPostAction | ChangeVotesAction | InitPostsAction;

export const selectPost = (id: number): SelectPostAction => ({
  type: TYPES.SELECT_POST,
  payload: { id },
});

export const changePostVotes = (id: number, delta: number): ChangeVotesAction => ({
  type: TYPES.CHANGE_VOTES,
  payload: { id, delta },
});

export const initPosts = (posts: PostArrayType = []): InitPostsAction => ({
  type: TYPES.INIT_POSTS,
  payload: { posts },
});
