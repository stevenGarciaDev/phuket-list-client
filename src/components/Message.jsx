import React, { Component } from 'react';
import Moment from 'react-moment';
import { getCurrentUser } from '../services/authService';
import { setReadState } from '../services/messageService';

class Message extends Component {
  componentDidMount = async () => {
    if (this.props.readerid != this.props.senderid ) {
      console.log("reader is not sender")
      const msgupdate = await setReadState(this.props.groupId, this.props.msgId);
    }
  }

  render() {
    const { senderid, readerid, sender, text, dateCreated, isRead } = this.props;

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
