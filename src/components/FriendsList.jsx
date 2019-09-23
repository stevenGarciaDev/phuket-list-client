import React, { Component } from 'react';
import FriendInfoItem from './FriendInfoItem';
import AlertMessage from './AlertMessage';
import {
  getPotentialFriends,
  getFriends,
  addFriend,
  acceptFriend,
  removeFriend } from "../services/friendshipService";
import { getCurrentUser } from '../services/authService';
import { getUserbyEmail } from '../services/userService';

class FriendsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      potentialFriends: [],
      filteredPotentialFriends: [],
      currentView: 'find',
      friends: [],
      filteredFriends: [],
      displayAlert: false,
      alertMessage: ""
    };
  }

  componentDidMount = async () => {
    const currentUser = getCurrentUser();
    const friends = await getFriends(currentUser.email);
    let potentialFriends = await getPotentialFriends(currentUser.email);

    potentialFriends = potentialFriends.filter(f => f.name !== currentUser.name);

    let frData = [];
    for (let i = 0; i < friends.data.length; i++){
      let user = friends.data[i];
      console.log("user", user);
      var obj = {'email': user.userEmail, 'name': user.username, 'photo': '', 'status': user.status};
      frData.push(obj);
    }
    this.setState({friends:frData, filteredFriends: frData, potentialFriends, filteredPotentialFriends: potentialFriends });
  }

  toggleSegmentBtn = (text) => {
    const { currentView, potentialFriends, friends } = this.state;
    if (currentView === text) return;
    const updatedView = currentView === 'find' ? 'edit' : 'find';
    this.setState({ currentView: updatedView, filteredPotentialFriends: potentialFriends, filteredFriends: friends });
  }

  filterFriendOptions = (e) => {
    let potentialFriends = [ ...this.state.potentialFriends ];
    if (e.target.value === "") {
      this.setState({ filteredPotentialFriends: potentialFriends});
      return;
    }
    const regex = new RegExp(`^${e.target.value.toLowerCase()}`, 'g');
    const filteredPotentialFriends = potentialFriends.filter(f => f.name.toLowerCase().match(regex));
    this.setState({ filteredPotentialFriends });
  }

  filterExistingFriends = (e) => {
    let friends = [ ...this.state.friends ];
    if (e.target.value === "") {
      this.setState({ filteredFriends: friends});
      return;
    }
    const regex = new RegExp(`^${e.target.value.toLowerCase()}`, 'g');
    const filteredFriends = friends.filter(f => f.name.toLowerCase().match(regex));
    this.setState({ filteredFriends });
  }

  handleEditFriendStatus = async (e, user) => {
    console.log("user is ", user);

    e.preventDefault();

    let {
      displayAlert,
      alertMessage,
      currentView,
      potentialFriends,
      friends,
      filteredPotentialFriends,
      filteredFriends
     } = this.state;
    const currentUser = getCurrentUser();
    const emailuse = currentUser.email;

    console.log("!currentUser", currentUser);
    console.log("!user", user);

    switch (user.status) {
      case "Accept":
        acceptFriend(user.email, user.id, emailuse);
        alertMessage = `Accepted Friend Request from ${user.name}`
        displayAlert = true;
        break;
      case "Add Friend":
        addFriend(currentUser.email, user.email,);
        alertMessage = `Sent Friend Request to ${user.name}`
        displayAlert = true;

        potentialFriends = potentialFriends.filter(f => f.name !== user.name);
        user.status = 'Unfriend';
        friends.push(user);
        break;
      case "Unfriend":
        removeFriend(user.email, currentUser.email);
        alertMessage = `Unfriend ${user.name}`;
        displayAlert = true;

        friends = friends.filter(f => f.name !== user.name);
        user.status = 'Add Friend';
        potentialFriends.push(user);
        break;
      default:
        alertMessage = ""
        displayAlert = false;
        break;
    }

    this.setState({
      displayAlert,
      alertMessage,
      potentialFriends,
      friends,
      filteredPotentialFriends: potentialFriends,
      filteredFriends: friends,
    });
  }

  render() {
    const { currentView, potentialFriends, filteredPotentialFriends, friends, filteredFriends, displayAlert, alertMessage } = this.state;
    let findFriendsClass;
    let editFriendsClass;

    if (currentView === 'find') {
      findFriendsClass = "btn btn-primary";
      editFriendsClass = "btn btn-light";
    } else {
      findFriendsClass = "btn btn-light";
      editFriendsClass = "btn btn-primary";
    }

    return (
      <div>
        { displayAlert && <AlertMessage text={alertMessage} />}

        <div className="segmentBtn-container">
          <button className={findFriendsClass} onClick={() => this.toggleSegmentBtn('find')}>Find Friends</button>
          <button className={editFriendsClass} onClick={() => this.toggleSegmentBtn('edit')}>Edit Friends List</button>
        </div>

        { currentView === 'find' ?

          <div className="container friends-list-content">
            <input type="text"
              className="form-control col-md-6 offset-md-3"
              placeholder="Search by name..."
              onChange={(e) => this.filterFriendOptions(e)} />
            <h2 className="friends-page-title">People You May Know</h2>

            <div className="row">
              { filteredPotentialFriends.length > 0 &&
                filteredPotentialFriends.map(user => <FriendInfoItem
                                                key={user._id}
                                                user={user}
                                                onEditFriendStatus={this.handleEditFriendStatus} /> )
              }
            </div>
          </div>

        :

          <div>

            { friends.length > 0 ?
              <div className="container friends-list-content">
                <input type="text"
                  className="form-control col-md-6 offset-md-3"
                  placeholder="Search by name..."
                  onChange={(e) => this.filterExistingFriends(e)} />
                <h2>Friends {friends.length}</h2>
                <div className="row">
                {
                  filteredFriends.map(user => <FriendInfoItem
                                        key={user._id}
                                        user={user}
                                        onEditFriendStatus={this.handleEditFriendStatus} />)
                }
                </div>
              </div>
            :
              <h2>Add bucket list tasks and begin adding friends!</h2>
            }

          </div>
        }

      </div>
    );
  }

}

export default FriendsList;
