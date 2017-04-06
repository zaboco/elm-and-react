// @flow

import React from 'react';
import './Post.css';

type PostParams = {
  id: number,
  title: string,
};

const postClass = selected => selected ? 'Post selected' : 'Post';

const Post = ({ id, title }: PostParams) => (
  <div className={postClass(id === 1)}>
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
  </div>
);

export type { PostParams };
export default Post;
