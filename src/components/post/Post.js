// @flow

import React from 'react';
import type { PostType } from '../../types';
import './Post.css';

type PostParams = {
  post: PostType,
  selected: boolean,
  onVotesChange: (delta: number) => void,
  onSelect: () => void,
};

const postClass = selected => selected ? 'Post selected' : 'Post';

const stopPropagation = (next: () => void) =>
  ev => {
    ev.stopPropagation();
    next();
  };

const Post = ({ post: { id, title, votes }, selected, onVotesChange, onSelect }: PostParams) => (
  <div className={postClass(selected)} onClick={onSelect}>
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
    <div className="Post-votes">
      <button onClick={stopPropagation(() => onVotesChange(-1))}>-</button>
      <span>{votes}</span>
      <button onClick={stopPropagation(() => onVotesChange(1))}>+</button>
    </div>
  </div>
);

export default Post;
