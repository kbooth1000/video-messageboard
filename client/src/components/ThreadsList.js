import React from 'react';

import Thread from './Thread';
import './threadslist.css';

const ThreadsList = () => {
  return (
    <div className="ThreadsList">
      <Thread />
      <Thread />
      <Thread />
      <Thread />
    </div>
  )
}

export default ThreadsList;