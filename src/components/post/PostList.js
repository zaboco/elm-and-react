// @flow

import React from 'react';

import Post from './Post';
import type { PostParams } from './Post';

const PostList = ({ posts }: { posts: Array<PostParams> }) => (
  <div className="PostList">
    {posts.map(post => <Post {...post} />)}
  </div>
);

export default PostList;
