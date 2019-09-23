import React, { Component } from 'react';

class EditToolbar extends Component {

  render() {
    return (
      <React.Fragment>
        <span>
          <i className="fa fa-check fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onUpdate()}></i>
        </span>

        <span>
          <i className="fa fa-times fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onEdit()}></i>
        </span>
      </React.Fragment>
    );
  }
}

export default EditToolbar;
