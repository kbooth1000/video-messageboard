
import React, { Component } from 'react';

class VideoRecorder extends Component {
  constructor() {
    super();
    this.videoRecordingRef = React.createRef();
    this.videoRecordedRef = React.createRef();
    this.mediaRecorder = null;
    this.mediaSource = new MediaSource();
    this.sourceBuffer = null;
    this.state = {
      errorMsg: '',
      recordBtnText: 'Start Recording',
      recordBtnDisabled: true,
      playBtnDisabled: true,
      downloadBtnDisabled: true,
      recordedBlobs: []
    }
  }


  handleSourceOpen = (event) => {
    console.log('MediaSource opened');
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', this.sourceBuffer);
  }
  
  handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0) {
      this.setState({
        recordedBlobs: [...this.state.recordedBlobs, event.data]
      })
      // recordedBlobs.push(event.data);
    }
  }
  
  startRecording = () => {
    // recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`);
      this.setState({
        errorMsg: `${options.mimeType} is not Supported`
    });
      options = {mimeType: 'video/webm;codecs=vp8'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        this.setState({errorMsg: `${options.mimeType} is not Supported`})
      };
        options = {mimeType: 'video/webm'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not Supported`);
          this.setState({
            errorMsg: `${options.mimeType} is not Supported`
          });
          options = {mimeType: ''}
          
        }
      }
    
  
      try {
      this.mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      this.setState({
        errorMsg: `Exception while creating MediaRecorder: ${JSON.stringify(e)}`
      });
      return;
    }
    
    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    this.setState({
      recordBtnText: 'Stop Recording'
    });
    this.setState({
      playBtnDisabled: true
    });
    this.setState({
      downloadBtnDisabled: true
    });
    this.mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
    };
    this.mediaRecorder.ondataavailable = this.handleDataAvailable;
    this.mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', this.mediaRecorder);
  }
  
  stopRecording = () => {
    this.mediaRecorder.stop();
    console.log('Recorded Blobs: ', this.state.recordedBlobs);
  }
  
  handleSuccess = (stream) => {
    this.setState({
      recordBtnDisabled: false
    });    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
  
    // const gumVideo = document.querySelector('video#gum');
    this.videoRecordingRef.current.srcObject = stream;
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

  recordClickHandler = () => {
    if (this.state.recordBtnText === 'Start Recording') {
      this.startRecording();
    } else {
      this.stopRecording();
      this.setState({
        recordBtnText: 'Start Recording'
      });
      this.setState({
        playBtnDisabled: false
      });
      this.setState({
        downloadBtnDisabled: false
      });    }
  };
  
  // const playButton = document.querySelector('button#play');
  playClickHandler = () => {
    const superBuffer = new Blob(this.state.recordedBlobs, {type: 'video/webm'});
    this.videoRecordedRef.current.src = null;
    this.videoRecordedRef.current.srcObject = null;
    this.videoRecordedRef.current.src = window.URL.createObjectURL(superBuffer);
    this.videoRecordedRef.current.controls = true;
    this.videoRecordedRef.current.play();
  };
  
  downloadClickHandler = () => {
    const blob = new Blob(this.state.recordedBlobs, {type: 'video/webm'});
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
  };
  
  startClickHandler = async () => {
    console.log('START');
    
    // const hasEchoCancellation = document.querySelector('#echoCancellation').checked; //use in audio constraints (exact: hasEchoCancellation)
    const constraints = {
      audio: {
        echoCancellation: {exact: true}
      },
      video: {
        width: 640, height: 360
      }
    };
    console.log('Using media constraints:', constraints);
    await this.init(constraints);
  };

componentDidMount = () => {
  this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);
}

  render() {
    
    return (

      <div id="container">
        <video ref={this.videoRecordingRef} id="gum" playsInline autoPlay muted></video>
        <video ref={this.videoRecordedRef} id="recorded" playsInline loop></video>
    
        <div>
            <button id="start" onClick={this.startClickHandler}>Start camera</button>
            <button id="record" disabled={this.state.recordBtnDisabled} onClick={this.recordClickHandler}>{this.state.recordBtnText}</button>
            <button id="play" disabled={this.state.playBtnDisabled} onClick={this.playClickHandler}>Play</button>
            <button id="download" disabled={this.state.downloadBtnDisabled} onClick={this.downloadClickHandler}>Download</button>
        </div>
        <div>
            <span id="errorMsg">{this.state.errorMsg}</span>
        </div>
    </div>
    )
  }
}

export default VideoRecorder;