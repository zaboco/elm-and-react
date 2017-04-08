// @flow

export type PostType = {
  id: number,
  title: string,
  votes: number,
};

export type PostArrayType = Array<PostType>;

export type AppState = {
  posts: PostArrayType,
  selectedPostId: number,
};
