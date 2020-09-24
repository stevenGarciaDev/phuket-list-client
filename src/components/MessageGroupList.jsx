import React, { Component } from 'react';
import MessageListItem from './MessageListItem';
import { retrieveUserId } from '../services/userService';

class MessageGroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCreatingGroup: false,
      membersToAdd: []
    };
  }

  onMemberUpdate = (e) => {
    const memberNameToAdd = e.target.value;
    this.setState({ memberNameToAdd });
  }

  addNextMember = async () => {
    const { memberNameToAdd } = this.state;
    const membersToAdd = [ ...this.state.membersToAdd ];
    const res = await retrieveUserId(memberNameToAdd);
    console.log("addNextMember");
    const userId = res.data[0]._id;
    console.log("the user id is ", userId);
    membersToAdd.push(userId);
    console.log("membersToAdd", membersToAdd);
    this.setState({ memberNameToAdd: "", membersToAdd });
  }

  render() {
    const { messageGroups } = this.props;

    return (
      <div className="message-groups-list">
        <h1 className="message-group-header">My Groups</h1>
        <hr id="message-group-divider" />

        <div>
          { messageGroups &&
            messageGroups.map(group => (
              <MessageListItem
                id={group._id}
                key={group._id}
                group={group}
                onItemClick={this.props.onItemClick}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default MessageGroupList;
