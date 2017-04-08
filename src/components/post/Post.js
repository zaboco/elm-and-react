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
  selectedId?: number,
  onVotesChange: (delta: number) => void,
  onSelect: () => void,
};

const postClass = selected => selected ? 'Post selected' : 'Post';

const stopPropagation = (next: () => void) =>
  ev => {
    ev.stopPropagation();
    next();
  };

const Post = ({ post: { id, title, votes }, selectedId, onVotesChange, onSelect }: PostParams) => (
  <div className={postClass(id === selectedId)} onClick={onSelect}>
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
    <div className="Post-votes">
      <button onClick={stopPropagation(() => onVotesChange(-1))}>-</button>
      <span>{votes}</span>
      <button onClick={stopPropagation(() => onVotesChange(1))}>+</button>
    </div>
  </div>
);

Post.defaultProps = {
  selectedId: 1,
};

export default Post;
