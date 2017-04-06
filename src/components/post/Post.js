// @flow

import React from 'react';

import './Post.css';

type PostParams = {
  id: number,
  title: string,
};

const Post = ({ id, title }: PostParams) => (
  <div className="Post">
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
  </div>
);

export type { PostParams };
export default Post;
