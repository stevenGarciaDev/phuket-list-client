import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ModalDeleteAccount from "./ModalDeleteAccount";

class SettingsActiveAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.displayName,
      open: false
    }

  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // async onDelete() {
  //   // on click on confirmation button
  //   const result = window.confirm("Are you sure you want to delete your account?");

  //   if (result) {
  //     // get the current user
  //     const user = getCurrentUser();
  //     // call api to delete the user
  //     const userDeleted = await deleteUser(user._id);
  //     console.log("userDeleted", userDeleted);
  //   }
  // }

  render() {
    const { displayName,open } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td>{displayName}</td>
          <td className="settingsValue">Currently Active</td>
          <td className="settings-change-btn">
            <button
              onClick={this.onOpenModal}
              className="btn btn-danger">
              Delete
            </button>
            <Modal open={open} onClose={this.onCloseModal}>
          <h2>Confirm Delete account</h2>
          <ModalDeleteAccount></ModalDeleteAccount>
        </Modal>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default SettingsActiveAccount;
