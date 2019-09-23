import React, { Component } from 'react';

class SettingDetailToggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      displayName: this.props.displayName,
      settingValue: this.props.settingValue,
      settingProperty: this.props.settingProperty,
      detailType: this.props.detailType,
    };
  }

  componentWillReceiveProps(nextProps){ //update this child if information sent is updated
    if(nextProps.boolValue !== this.state.isEditing){ // update if this property is true or false
        this.setState({isEditing:nextProps.boolValue});

    }

    if(nextProps.settingValue !== this.props.settingValue){ // update if setting value is different
      this.setState({settingValue:nextProps.settingValue});
  }

  }

  toggleEdit = () => {
    const { settingProperty } = this.state;
    const togValue = !this.state.isEditing;
    this.setState({
      isEditing: togValue
    });
    this.toggleName(togValue);

    this.props.onUpdate(settingProperty, togValue);
  }

  toggleName = (togValue) =>
  {
    if(this.state.settingProperty === "isActiveAccount")
    {
      this.setState({settingValue:(togValue ? 'Active' : 'NonActive')});

    }
    else
    {
      this.setState({settingValue:(togValue ? 'Private' : 'Public')});

    }
  }

  render() {
    const {
      isEditing,
      displayName,
      settingValue,
    } = this.state;

    return (
      <React.Fragment>
        <tr>
          <td>{displayName}</td>
          <td className="settingsValue">{settingValue}</td>
          <td className="settings-change-btn">
            { isEditing ?
                <i
                  className="fa fa-toggle-on fa-2x"
                  aria-hidden="true"
                  onClick={this.toggleEdit}>
                </i>
              :
                <i onClick={this.toggleEdit} className="fa fa-toggle-off fa-2x"
                 aria-hidden="true"></i>
            }
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default SettingDetailToggle;
