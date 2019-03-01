import React from 'react';

import Spinner from './Spinner';
import './assets/styles/post.css';

const PostThumbBox = props => (
  <div className="PostThumbBox">
    <div className="video-box">
      <video src="" />
      <Spinner />
    </div>
    <div className="video-info">
      <div className="title">{props.post.text}</div>
      <div className="date-posted">posted on {props.post.date}</div>
      <div className="user">by {props.post.name}</div>
      <button>Reply</button>
    </div>
  </div>
);

export default PostThumbBox;