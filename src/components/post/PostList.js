// @flow

import React from 'react';
import Post from './Post';
import type { PostType } from './Post';

type PostParamsArray = Array<PostType>;

const PostList = (
  {
    posts,
    onPostVotesChange,
  }: { posts: Array<PostType>, onPostVotesChange: (id: number, votes: number) => void },
) => (
  <div className="PostList">
    {posts.map(post => (
      <Post key={post.id} post={post} onVotesChange={delta => onPostVotesChange(post.id, delta)} />
    ))}
  </div>
);

export type { PostParamsArray };
export default PostList;
