import React, { Component } from 'react';

class GroupMemberForm extends Component {

  render() {
    const { groupButtonText } = this.props;

    return (
      <div className="new-group-container">
        <button onClick={this.props.handleNewGroup} className="btn btn-success new-group-item">{groupButtonText}</button>
        { isCreatingGroup &&
          <div className="new-group-form-container">
            <input type="text" onChange={this.props.onMemberUpdate} className="add-member-input form-control" placeholder="Member's name" />
            <button onClick={() => this.props.addNextMember()} className="btn btn-info">Add</button>
          </div>
        }
       </div>
    );
  }
}

export default GroupMemberForm;
