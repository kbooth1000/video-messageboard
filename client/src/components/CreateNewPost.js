import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoRecorder from './VideoRecorder';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import { addPost } from '../actions/postsActions';

class CreateNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      recordedBlobs: [],
      errors: {},
      dateString: ''
    };
  }

  getVideoBlob = () =>
    new Blob(this.state.recordedBlobs, { type: 'video/mp4' });

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { currentUser } = this.props.auth;
    console.log('this.props.auth', this.props.auth);
    const date = new Date();
    const dateString = `${date.getFullYear}${date.getMonth}${date.getDay}${date.getHours}${date.getMinutes}${date.getMilliseconds}`;
    this.setState({dateString})
    const newPost = {
      text: this.state.text,
      videoUrl: `/uploads/${this.state.dateString}.mp4`,
      name: currentUser.name,
      avatar: currentUser.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <VideoRecorder />
        <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              placeholder="Create a post"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
            />
            {/* <input type="file"  */}
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

CreateNewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(CreateNewPost);
