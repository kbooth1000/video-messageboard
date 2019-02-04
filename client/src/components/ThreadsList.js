import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/postsActions';

import PostThumbBox from './PostThumbBox';
import './assets/styles/threadslist.css';

class ThreadsList extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    this.props.getPosts();
  }

  render() {
    const {posts} = this.props.posts;
    console.log('posts', this.props.posts);
    let postsList = posts.map(post=>(
      <PostThumbBox key={post.id} posts={posts} />
    ))
    
    return (
      <div className="ThreadsList">
        {postsList}
      </div>
    );
  }
}

let mapStateToProps = state =>( {
  posts: state.posts
});

export default connect(mapStateToProps, {getPosts})(ThreadsList);
