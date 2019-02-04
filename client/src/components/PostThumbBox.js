import React, { Component } from 'react';

import Spinner from './Spinner';
import './assets/styles/post.css';

const PostThumbBox = props => (
  <div className="PostThumbBox">
    <div className="video-box">
      <video src="" />
      <Spinner />
    </div>
    <div className="video-info">
      <div className="title">TITLE</div>
      <div className="date-posted">DATE POSTED</div>
      <div className="user">USER</div>
      <button>Reply</button>
    </div>
  </div>
);

export default PostThumbBox;