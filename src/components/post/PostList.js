// @flow

import React from 'react';
import Post from './Post';
import type { PostArrayType } from '../../types';

type PostListParams = {
  posts: PostArrayType,
  selectedPostId: number,
  onPostVotesChange: (id: number, delta: number) => void,
  onPostSelect: (id: number) => void,
};
const PostList = (
  {
    posts,
    selectedPostId,
    onPostVotesChange,
    onPostSelect,
  }: PostListParams,
) => (
  <div className="PostList">
    {posts.map(post => (
      <Post
        key={post.id}
        post={post}
        selected={post.id === selectedPostId}
        onVotesChange={delta => onPostVotesChange(post.id, delta)}
        onSelect={() => onPostSelect(post.id)}
      />
    ))}
  </div>
);

export default PostList;
