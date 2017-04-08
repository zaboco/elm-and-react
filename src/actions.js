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

type ActionCreator<A> = (...args: Array<any>) => A;

export const selectPost: ActionCreator<SelectPostAction> = (id: number) => ({
  type: TYPES.SELECT_POST,
  id,
});

export const changePostVotes: ActionCreator<ChangeVotesAction> = (id: number, delta: number) => ({
  type: TYPES.CHANGE_VOTES,
  id,
  delta,
});

export const initPosts: ActionCreator<InitPostsAction> = (posts: PostArrayType = []) => ({
  type: TYPES.INIT_POSTS,
  posts,
});
