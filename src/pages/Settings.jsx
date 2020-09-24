import React, { Component } from 'react';
import SettingDetailInput from '../components/SettingDetailInput';
import SettingDetailToggle from '../components/SettingDetailToggle';
import SettingsActiveAccount from '../components/SettingsActiveAccount';
import { updateSettingDetail, getSettingtDetail } from '../services/userService';
import PasswordNew from '../components/PasswordNew';
import Modal from 'react-responsive-modal';
import { Form, Button } from 'react-bootstrap';
import {getCurrentLocation} from '../services/locationService';

import { connect } from 'react-redux';
import { selectCurrentUser, selectUserToken } from '../store/user/user.selectors';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      email: " ",
      isPrivate: false,
      isActive: false,
      isSyncLocation: false
    }
  }

  locationOn() {
    try {
      this.setState({isSyncLocation: true});
    } catch{
      console.log("Fail to sync location");
    }
  }

  locationOff() {
    this.setState({isSyncLocation : false});
  }

  async componentDidMount() {
    const { currentUser: user, token: jwt } = this.props;
    const setInfo = await getSettingtDetail(user, jwt);
    console.log(setInfo.data);
    this.setState({
      name: setInfo.data["name"], email: setInfo.data["email"],
      isPrivate: setInfo.data["isPrivate"], isActive: setInfo.data["isActive"]  
    });
  }

  handleUpdate = (detailName, value) => {
    const { currentUser: user, token: jwt } = this.props;
    updateSettingDetail(user, detailName, value, jwt);
  }

  shareLocation = async (e) => {
    e.preventDefault();

    await getCurrentLocation();
    this.setState({isSyncLocation : false});
  }


  render() {
    const { name, email, isPrivate, isActive } = this.state;
    const { currentUser } = this.props;

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

        <div className="settings-module"> 
          <Button variant="primary" size="lg" block onClick={() => this.locationOn()}>
            Sync Location
          </Button>

          <Modal open={this.state.isSyncLocation} onClose={() => this.locationOff()}>
            <h2>Syncing Location</h2>
            <p>Are you sure you want share your location?</p>
            <Form >
              <Button className="d-flex justify-content-start" variant="warning" type="submit" 
                onClick={(e) => this.shareLocation(e)} >
                    Confirm
              </Button> 
            </Form>
          </Modal>
        </div>

        <div className="settings-module">
          <h2>Security</h2>
          <div className="settings-module password">
            <h4 className="text-left">Password</h4>
            <p className="text-left">Choose a strong password and don't reuse it for other accounts.</p>

          <PasswordNew
            userId={currentUser._id} />  

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  selectUserToken: selectUserToken(state)
});

export default connect(mapStateToProps)(Settings);