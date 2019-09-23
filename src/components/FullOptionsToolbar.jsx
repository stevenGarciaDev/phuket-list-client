import React, { Component } from 'react';

class FullOptionsToolbar extends Component {

  render() {

    return (
      <React.Fragment>
        <span>
          <button
            className="btn btn-warning">Groups</button>
        </span>

        <span>
          <i className="fa fa-pencil-square-o fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onEdit()}></i>
        </span>

        <span>
          <i className="fa fa-check-circle-o fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onCheck()}></i>
        </span>

        <span>
          <i className="fa fa-trash fa-2x"
             aria-hidden="true"
             onClick={() => this.props.onDelete()}></i>
        </span>
      </React.Fragment>
    );
  }
}

export default FullOptionsToolbar;
