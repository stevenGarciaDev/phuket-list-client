import React, { Component } from 'react';
import SettingDetailInput from './SettingDetailInput';
import SettingDetailToggle from './SettingDetailToggle';
import SettingsActiveAccount from './SettingsActiveAccount';
import { getCurrentUser } from '../services/authService';
import { updateSettingDetail, getSettingtDetail } from '../services/userService';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: getCurrentUser(),
      name: " ",
      email: " ",
      isPrivate: false,
      isActive: false
    }
  }

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const setInfo = await getSettingtDetail(this.state.user, jwt);
    console.log(setInfo.data);
    this.setState({name: setInfo.data["name"], email: setInfo.data["email"],
     isPrivate: setInfo.data["isPrivate"], isActive: setInfo.data["isActive"]  });


     console.log(this.state);

  }

  handleUpdate = (detailName, value) => {
    console.log("detail name is ", detailName);
    console.log("value is ", value);
    const jwt = localStorage.getItem("token");
    const response = updateSettingDetail(this.state.user, detailName, value, jwt);
    console.log(response);

    //this.setState({user: getCurrentUser() });

  }

  render() {
    const { name, email, isPrivate, isActive } = this.state;


    return (
      <div className="container" id="body-wrapper">
       <h1>Account Settings</h1>

       <table className="table settings-container">

        <SettingDetailInput
          displayName={"Full Name"}
          settingProperty="name"
          settingValue={name}
          onUpdate={this.handleUpdate} />



        <SettingDetailInput
          displayName="Email"
          settingProperty="email"
          settingValue={email}
          onUpdate={this.handleUpdate} />

        <SettingDetailToggle
          displayName = "Account Privacy"
          settingProperty= "isPrivateProfile"
          settingValue={isPrivate ? 'Private' : 'Public' }
          boolValue = {isPrivate}
          onUpdate={this.handleUpdate}
        />

        <SettingDetailToggle
          displayName="Account Status"
          settingProperty="isActiveAccount"
          settingValue={isActive ? 'Active' : 'NonActive' }
          boolValue = {isActive}
          onUpdate={this.handleUpdate}
        />

        <SettingsActiveAccount
          displayName="Permanently Deactive Account"
        />

        </table>
      </div>
    );
  }

}

export default Settings;
