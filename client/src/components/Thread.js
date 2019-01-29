import React, {Component} from 'react';
import {connect} from 'react-redux';

import { getPosts } from '../actions/postsActions';

import Post from './Post';
import './thread.css';

class Thread extends Component{
    constructor(props){
        super();
    }
    componentDidMount(){
        this.props.getPosts();
    }
    render(){
        const postText = this.props.posts;
        console.log('props---: ', postText);
        // console.log('props: ', this.props);
        return (
    <div className="Thread">
        <aside>{`--${postText}`}</aside>
        <Post />
    </div>
    )
    }
}

const mapStateToProps = state => (
    {posts: state.posts}
)

export default connect(mapStateToProps, {getPosts})(Thread); 