import React from 'react';

// import VideojsRecordPlayer from './VideoRecorder';
import './assets/styles/newthreadbutton.css'

const NewThreadButton = () => {

  const videoJsOptions = {
    controls: true,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 10,
            debug: true
        }
    }
  };
  
  let onClickHandler = (e) => {
     // use correct video mimetype for opera
    if (!!window.opera || navigator.userAgent.indexOf('OPR/') !== -1) {
      videoJsOptions.plugins.record.videoMimeType = 'video/webm\;codecs=vp8'; // or vp9
    } else {
      videoJsOptions.plugins.record.videoMimeType = 'video/webm\;codecs=vp8';
    }
  }

  return (
    <div className="NewThreadButton">
      <button onClick={onClickHandler}>New Thread</button>
    </div>
  )
}

export default NewThreadButton;