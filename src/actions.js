// @flow

export const TYPES = {
  SELECT_POST: 'SELECT_POST',
  CHANGE_VOTES: 'CHANGE_VOTES',
};

type SelectPostActionType = 'SELECT_POST';
type ChangeVotesActionType = 'CHANGE_VOTES';
export type ActionType = SelectPostActionType | ChangeVotesActionType;

type SelectPostAction = { type: SelectPostActionType, id: number };
type ChangeVotesAction = { type: ChangeVotesActionType, id: number, delta: number };
export type Action = SelectPostAction | ChangeVotesAction;

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
