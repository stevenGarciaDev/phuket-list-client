import React, { Component } from 'react';
import Moment from 'react-moment';

class Message extends Component {

  render() {
    //const { name, photo, message, dateCreated } = this.props.feed;
    //console.log("PROPS", this.props);

    const { sender, text, dateCreated } = this.props;
    //console.log("text is ", text);

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
        </div>

        <div className="msg-text-container">
          { text }
        </div>
      </div>
    );
  }
}

export default Message;
