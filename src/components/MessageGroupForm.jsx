import React, { Component } from 'react';
import NewGroupMemberIcon from './NewGroupMemberIcon';
import { retrieveUserId } from '../services/userService';
import { getCurrentUser } from '../services/authService';
import { getGroup } from '../services/messageService';

class MessageGroupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCreatingGroup: false,
      buttonText: 'Start a new group',
      groupName: '',
      membersToAdd: [],
      searchResults: [],
      membersNameToAdd: '',
      errorMessage: null,
      successMessage: null
    }
  }

  handleNewGroup = async () => {
    let { isCreatingGroup, buttonText, membersToAdd, groupName } = this.state;

    isCreatingGroup = !isCreatingGroup;
    if (isCreatingGroup) {
      buttonText = "Create Group";
    } else {
        if (groupName === '') {
          const errorMessage = 'Must set a unique group name';
          this.setState({ errorMessage });
          return;
        }

        // check if the group name is unique
        const response = await getGroup(groupName);
        if (response.length !== 0) {
          const errorMessage = 'Must set a unique group name';
          this.setState({ errorMessage });
          return;
        }
           
        if (membersToAdd.length >= 1) {   
          this.props.onMakeNewGroup(membersToAdd, groupName);
        } else {
          const errorMessage = 'Must add members to your group';
          this.setState({ errorMessage });
          return;
        }

        buttonText = "Start a new group";
        membersToAdd = [];
    }
    this.setState({ isCreatingGroup, buttonText, membersToAdd, errorMessage: '' });
  }

  closeGroup = () => {
    this.setState({ isCreatingGroup: false, buttonText: 'Start a new group' });
  }

  addNewMember = async () => {
    const membersToAdd = [ ...this.state.membersToAdd ];
    const { membersNameToAdd } = this.state;

    // ensure not adding oneself
    const currentUser = getCurrentUser();
    if (currentUser.name.toLowerCase() === membersNameToAdd.toLowerCase()) {
      const errorMessage = `${membersNameToAdd}, you are added by default.`;
      this.setState({ membersNameToAdd: "", errorMessage });
      return;
    }

    // ensure no duplicates
    for (let i = 0; i < membersToAdd.length; i++) {
      const currentMember = membersToAdd[i];
       if (currentMember.name.toLowerCase() === membersNameToAdd.toLowerCase()) {
         const errorMessage = `Unable to add member, ${membersNameToAdd}, due to duplicate`;
         this.setState({ membersNameToAdd: "", errorMessage });
         return;
       }
    }

    let userId;
    try {
      const res = await retrieveUserId(membersNameToAdd);
      userId = res.data[0]._id;
    } catch (ex) {
      const errorMessage = `Unable to add member, ${membersNameToAdd}, account does not exist`;
      this.setState({ membersNameToAdd: "", errorMessage });
      return;
    }

    const memberObj = { "id": userId, "name": membersNameToAdd };
    membersToAdd.push(memberObj);
    this.setState({ membersNameToAdd: "", errorMessage: null, membersToAdd });
  }

  onMemberUpdate = async (e) => {
    let nameEntered = e.target.value;
    const regex = new RegExp(`^${nameEntered.toLowerCase()}`, 'g');

    let { friendsList } = this.props;
    const searchResults = friendsList.filter(f => f.username.toLowerCase().match(regex));
    //console.log("matching searchResults", searchResults);

    this.setState({ searchResults, membersNameToAdd: nameEntered });
  }

  setGroupName = (e) => {
    const groupName = e.target.value;
    this.setState({ groupName });
  }

  removeMemberFromNewGroup = (name) => {
    let membersToAdd = [ ...this.state.membersToAdd ];
    membersToAdd = membersToAdd.filter(m => m.name.toLowerCase() !== name.toLowerCase());
    this.setState({ membersToAdd });
  }

  render() {
    const { isCreatingGroup, buttonText, membersToAdd, membersNameToAdd, searchResults, errorMessage } = this.state;

    return (
      <div className="new-group-container">
        <button onClick={this.handleNewGroup} className="btn btn-success new-group-item">{buttonText}</button>
        
        { isCreatingGroup &&
          <React.Fragment>
            <button onClick={this.closeGroup} className="btn btn-danger">Cancel Group</button>

            <div className="group-info-input">
              <input type="text"
                      onChange={this.setGroupName}
                      className="form-control"
                      placeholder="Group Name"
              />
            </div>

            <div className="new-group-form-container group-info-input">
              <input type="text"
                value={membersNameToAdd}
                onChange={this.onMemberUpdate}
                className="form-control"
                placeholder="Member's name"
                list="memberToAdd"
              />
              <button onClick={this.addNewMember} className="btn btn-info btn-md group-info-input">Add Member</button>

              <datalist id="memberToAdd">
                { searchResults.length > 0 &&
                  searchResults.map(data => <option key={data.userEmail}>{data.username}</option>)
                }
              </datalist>

            </div>
          </React.Fragment>
        }
        <div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </div>

        {
          membersToAdd.length > 0 &&
            <div>
              {
                membersToAdd.map(m => <NewGroupMemberIcon
                                        key={m.id}
                                        name={m.name}
                                        onRemoveMember={this.removeMemberFromNewGroup} />)
              }
            </div>
        }
       </div>
    );
  }
}

export default MessageGroupForm;
