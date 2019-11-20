import React, { Component } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';
import { getCurrentUser } from '../services/authService';

class MessageFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readerId: ''
    };
  }

  componentDidMount = async () => {
    let objDiv = document.querySelector(".MessageFeed");
    objDiv.scrollTop = objDiv.scrollHeight;

    // get reader's id
    const user = await getCurrentUser();
    this.setState({ readerId: user._id });
  }

  retrieveUsername = (userId) => {
    const { feed } = this.props;
    let user = feed.members.filter(m => m._id === userId);
    user = user[0];
    return user.name;
  }

  retrieveReader = async () => {
    const user = await getCurrentUser();
    return user;
  }

  // Params
  // members: An array for the group members 
  // message: An object for the message
  determineUserImage = (members, message) => {
    let user = members.filter(m => m._id === message.sender);
    user = user[0];
    return user.photo;
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
                groupId={feed._id}
                msgId={data._id}
                readerid={this.state.readerId}
                senderid={data.sender}
                sender={ this.retrieveUsername(data.sender) }
                image={ this.determineUserImage(feed.members, data) }
                text={data.message}
                dateCreated={data.dateCreated}
                isRead={data.isRead}
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
