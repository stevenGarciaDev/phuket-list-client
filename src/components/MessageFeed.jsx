import React, { Component } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

class MessageFeed extends Component {

  componentDidMount() {
    let objDiv = document.querySelector(".MessageFeed");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  retrieveUsername = (userId) => {
    const { feed } = this.props;
    let user = feed.members.filter(m => m._id === userId);
    user = user[0];
    return user.name;
  }

  render() {
    const { feed } = this.props;

    return (
      <div className="message-feed-container">
        <div className="MessageFeed">
          { feed.messages &&
            feed.messages.map(data => (
              <Message
                key={data._id}
                sender={ this.retrieveUsername(data.sender) }
                text={data.message}
                dateCreated={data.dateCreated}
              />
            ))
          }
        </div>
        <MessageForm sendMessage={this.props.sendMessage} />
      </div>
    );
  }
}

export default MessageFeed;
