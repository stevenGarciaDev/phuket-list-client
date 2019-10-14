import React, { Component } from 'react';
import { getCurrentUser } from "../services/authService";
import { deleteUser } from "../services/userService";

class SettingsActiveAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.displayName
    }
    this.onDelete = this.onDelete.bind(this);
  }

  async onDelete() {
    // on click on confirmation button
    const result = window.confirm("Are you sure you want to delete your account?");

    if (result) {
      // get the current user
      const user = getCurrentUser();
      // call api to delete the user
      const userDeleted = await deleteUser(user._id);
      console.log("userDeleted", userDeleted);
    }
  }

  render() {
    const { displayName } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td>{displayName}</td>
          <td className="settingsValue">Currently Active</td>
          <td className="settings-change-btn">
            <button
              onClick={this.onDelete}
              className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default SettingsActiveAccount;
