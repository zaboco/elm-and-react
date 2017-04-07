// @flow

import React from 'react';
import './Post.css';

type PostParams = {
  id: number,
  title: string,
  votes?: number,
};

const postClass = selected => selected ? 'Post selected' : 'Post';

const Post = ({ id, title, votes }: PostParams) => (
  <div className={postClass(id === 1)}>
    <span className="Post-id">{id}</span>
    <span className="Post-title">{title}</span>
    <div className="Post-votes">
      <button>-</button>
      <span>{votes}</span>
      <button>+</button>
    </div>
  </div>
);

Post.defaultProps = {
  votes: 0,
};

export type { PostParams };
export default Post;
