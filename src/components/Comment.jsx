import React, { Component } from 'react';
import Moment from 'react-moment';
import {
  Link
} from 'react-router-dom';
import { getUser } from '../services/userService';


class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileImageURL: "",
      authorName: ""
    }
  }

  componentDidMount = async () => {
    // get user by id
    const user = await getUser(this.props.author);
    const { name, photo} = user.data;
    this.setState({ profileImageURL: photo, authorName: name });
  }

  render() {
    const { author, text, dateCreated } = this.props;
    const { profileImageURL, authorName } = this.state;

    return(
      <div className="comment-module">

        <div className="row nopadding">
          <div className="comment-module-author col-md-8 text-left">
            {profileImageURL ?
                (<img
                    className="post-module-profile-img"
                    src={profileImageURL}
                    alt="Img" />)
                :
                (<img
                    className="post-module-profile-img"
                    src="https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"
                    alt="Img" />)
              }
            <small className="post-module-author-name"><Link to={`/profile/${author}`} >{authorName}</Link></small>
          </div>

          <div className="col-md-3 text-right nopadding">
            <small>
              <Moment fromNow>
                {dateCreated}
              </Moment>
            </small>
          </div>
        </div>

        <div className="comment-module-content col-md-12">
          <p className="text-left">{text}</p>
        </div>

      </div>
    );
  }

}

export default Comment;
