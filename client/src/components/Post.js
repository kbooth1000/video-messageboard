import React, {Component} from 'react';

import Spinner from './Spinner';
import './assets/styles/post.css';

class Post extends Component {
    

    render(){

        return (
            <div className="Post">

                <div className="video-box">
                    <video src=""></video><Spinner />
                </div>
                <div className="video-info">
                    <div className="title">TITLE</div>
                    <div className="date-posted">DATE POSTED</div>
                    <div className="user">USER</div>
                    <button>Reply</button>
                </div>

            </div>
        )
    }
}

export default Post;