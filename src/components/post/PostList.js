// @flow

import React from 'react';
import Post from './Post';
import type { PostType } from './Post';

type PostParamsArray = Array<PostType>;

const PostList = (
  {
    posts,
    onPostVotesChange,
    onPostSelect,
  }: {
    posts: Array<PostType>,
    onPostVotesChange: (id: number, votes: number) => void,
    onPostSelect: (id: number) => void,
  },
) => (
  <div className="PostList">
    {posts.map(post => (
      <Post
        key={post.id}
        post={post}
        onVotesChange={delta => onPostVotesChange(post.id, delta)}
        onSelect={() => onPostSelect(post.id)}
      />
    ))}
  </div>
);

export type { PostParamsArray };
export default PostList;
