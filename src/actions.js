// @flow

import type { PostArrayType } from './types';

export const TYPES = {
  SELECT_POST: 'SELECT_POST',
  CHANGE_VOTES: 'CHANGE_VOTES',
  INIT_POSTS: 'INIT_POSTS',
};

type SelectPostAction = { type: typeof TYPES.SELECT_POST, id: number };
type ChangeVotesAction = { type: typeof TYPES.CHANGE_VOTES, id: number, delta: number };
type InitPostsAction = { type: typeof TYPES.INIT_POSTS, posts: PostArrayType };
export type Action = SelectPostAction | ChangeVotesAction | InitPostsAction;

export const selectPost = (id: number): SelectPostAction => ({
  type: TYPES.SELECT_POST,
  id,
});

export const changePostVotes = (id: number, delta: number): ChangeVotesAction => ({
  type: TYPES.CHANGE_VOTES,
  id,
  delta,
});

export const initPosts = (posts: PostArrayType = []): InitPostsAction => ({
  type: TYPES.INIT_POSTS,
  posts,
});
