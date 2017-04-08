// @flow

import React from 'react';
import './Post.css';

export type PostType = {
  id: number,
  title: string,
  votes?: number,
};

type PostParams = {
  post: PostType,
  onVotesChange: (delta: number) => void,
};

const postClass = selected => selected ? 'Post selected' : 'Post';

const Post = ({ post: { id, title, votes }, onVotesChange }: PostParams) => (
  <div className={postClass(id === 1)}>
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
    <div className="Post-votes">
      <button onClick={() => onVotesChange(-1)}>-</button>
      <span>{votes}</span>
      <button onClick={() => onVotesChange(1)}>+</button>
    </div>
  </div>
);

export default Post;
