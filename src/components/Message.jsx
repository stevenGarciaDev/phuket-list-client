import React, { Component } from 'react';
import Moment from 'react-moment';
import { getCurrentUser } from '../services/authService';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readerId: ''
    };
  }

  componentDidMount = async () => {
    const user = await getCurrentUser();
    console.log(user);
  }

  render() {
    //const { name, photo, message, dateCreated } = this.props.feed;
    //console.log("PROPS", this.props);

    const { senderid, readerid, sender, text, dateCreated, isRead } = this.props;
    //console.log("text is ", text);
    {console.log(this.props)}
    {console.log("Senderid: " + senderid)}
    {console.log("Readerid: " + JSON.stringify(readerid))}
    return (
      <div className="message">
        <div className="text-left row msg-header-container">
          <img
            className="post-module-profile-img"
            src={"" || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"}
            alt="Img" />
          <h2 className="msg-author">{sender}</h2>
          <p className="msg-created-at">
            <Moment fromNow>
              {dateCreated}
            </Moment>
          </p>
          <p>
            {( (senderid == readerid) ) ? '' : 
                ((isRead) ? '' : ('(new)'))}
          </p>
        </div>

        <div className="msg-text-container">
          { text }
        </div>
      </div>
    );
  }
}

export default Message;
