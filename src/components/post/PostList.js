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

const renderLoadingState = () => (
  <div className="PostList-loading">
    Loading Posts...
  </div>
);

const renderEmptyState = () => (
  <div className="PostList-empty">
    No Posts
  </div>
);

const PostList = (
  {
    posts,
    selectedPostId,
    onPostVotesChange,
    onPostSelect,
  }: PostListParams,
) => {
  return (
    <div className="PostList">
      {posts == null
        ? renderLoadingState()
        : posts.length === 0
            ? renderEmptyState()
            : posts.map(post => (
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
};

export default PostList;
