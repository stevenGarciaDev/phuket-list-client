import React, { Component } from 'react';

class SettingDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isEditing: false,
      displayName: this.props.displayName,
      settingProperty: this.props.settingProperty,
      settingValue: this.props.settingValue,
    };

  }

  componentWillReceiveProps(nextProps){ //update this child if information sent is updated
    if(nextProps.settingValue !== this.props.settingValue){
        this.setState({settingValue:nextProps.settingValue});
    }

    
  }

  handleInputChange = (e) => {
    const updatedValue = e.target.value;
    this.setState({ settingValue: updatedValue });
  }

  onClickSubmit = () => {
    const { settingProperty, settingValue } = this.state;

    console.log("about to update");
    console.log("setting property", settingProperty);
    console.log("setting value", settingValue);
    this.props.onUpdate(settingProperty, settingValue);
    this.toggleEdit();
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
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

          <td className="settingsValue">
            {isEditing ?
              <input type="text" onChange={this.handleInputChange} className="form-control" value={settingValue}/>
              :
              settingValue
            }
          </td>

          <td className="settings-change-btn">
            { isEditing ?
                <i
                  className="fa fa-check-circle-o fa-2x"
                  aria-hidden="true"
                  onClick={this.onClickSubmit}>
                </i>
              :
                <i onClick={this.toggleEdit} className="fa fa-pencil fa-2x" aria-hidden="true"></i>
            }
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default SettingDetail;
