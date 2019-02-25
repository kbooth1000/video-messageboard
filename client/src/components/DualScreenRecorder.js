
import React, { Component } from 'react';

class VideoRecorder extends Component {
  constructor() {
    super();
    this.videoRecordingRef = React.createRef();
    this.videoRecordedRef = React.createRef();
    this.state = {
      errorMsg: '',
      recordBtnText: 'Start Recording',
      recordBtnDisabled: true,
      playBtnDisabled: true,
      downloadBtnDisabled: true
    }
  }


  handleSourceOpen = (event) => {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
  }
  
  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }
  
  startRecording = () => {
    recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`);
      this.setState({
        errorMsg: `${options.mimeType} is not Supported`
    });
      options = {mimeType: 'video/webm;codecs=vp8'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
                errorMsg: `${options.mimeType} is not Supported`
      });
        options = {mimeType: 'video/webm'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not Supported`);
          this.setState({
            errorMsg: `${options.mimeType} is not Supported`;
          options = {mimeType: ''}
          });
        }
      }
    }
  
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      this.setState({
        errorMsg: `Exception while creating MediaRecorder: ${JSON.stringify(e)}`
      });
      return;
    }
  
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    this.setState({
      recordBtnText: 'Stop Recording'
    });
    this.setState({
      playBtnDisabled: true
    });
    this.setState({
      downloadBtnDisabled: true
    });
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', mediaRecorder);
  }
  
  stopRecording = () => {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
  }
  
  handleSuccess = (stream) => {
    this.setState({
      recordBtnDisable: false
    });    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
  
    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
  }
  
   init = async (constraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.handleSuccess(stream);
    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
      this.setState({
        errorMsg: `navigator.getUserMedia error:${e.toString()}`
      });
    }
  }
  render() {

    const mediaSource = new MediaSource();
    mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
    let mediaRecorder;
    let recordedBlobs;
    let sourceBuffer;
    
    // const errorMsgElement = document.querySelector('span#errorMsg');
    const recordedVideo = document.querySelector('video#recorded');
    recordButton.addEventListener('click', () => {
      if (recordButton.textContent === 'Start Recording') {
        this.startRecording();
      } else {
        this.stopRecording();
        this.setState({
          recordBtnText: 'Start Recording'
        });
        playButton.disabled = false;
        downloadButton.disabled = false;
      }
    });
    
    const playButton = document.querySelector('button#play');
    playButton.addEventListener('click', () => {
      const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
      recordedVideo.src = null;
      recordedVideo.srcObject = null;
      recordedVideo.src = window.URL.createObjectURL(superBuffer);
      recordedVideo.controls = true;
      recordedVideo.play();
    });
    
    const downloadButton = document.querySelector('button#download');
    downloadButton.addEventListener('click', () => {
      const blob = new Blob(recordedBlobs, {type: 'video/webm'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'test.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    });
    
    
    
    document.querySelector('button#start').addEventListener('click', async () => {
      const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
      const constraints = {
        audio: {
          echoCancellation: {exact: hasEchoCancellation}
        },
        video: {
          width: 1280, height: 720
        }
      };
      console.log('Using media constraints:', constraints);
      await init(constraints);
    });
      
    
    

    return (



      <div id="container">
        <video ref={this.videoRecordingRef} id="gum" playsinline autoplay muted></video>
        <video ref={this.videoRecordedRef} id="recorded" playsinline loop></video>
    
        <div>
            <button id="start">Start camera</button>
            <button id="record" disabled>{this.state.recordBtnText}</button>
            <button id="play" disabled={this.state.playBtnDisabled}>Play</button>
            <button id="download" disabled={this.state.downloadBtnDisabled}>Download</button>
        </div>
    
        <div>
            <h4>Media Stream Constraints options</h4>
            <p>Echo cancellation: <input type="checkbox" id="echoCancellation" /></p>
        </div>
    
        <div>
            <span id="errorMsg">{this.state.errorMsg}</span>
        </div>
    </div>
    )
  }
}

export default VideoRecorder;