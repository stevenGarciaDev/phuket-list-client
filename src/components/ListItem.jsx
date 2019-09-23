import React, { Component } from 'react';
import TaskName from './TaskName';
import OptionsToolbar from './OptionsToolbar';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  toggleEditMode = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    const { task } = this.props;
    return (
      <React.Fragment>
        <div className="ListItem row">

          <div className="col-md-7 task-name text-left">
            <TaskName isEditing={this.state.isEditing}
                    task={task} />
          </div>
          <div  className="col-md-5 nopadding">
            <OptionsToolbar isEditing={this.state.isEditing}
                          onEdit={this.toggleEditMode}
                          onDelete={this.props.onDelete}
                          onUpdate={this.props.onUpdate}
                          onComplete={this.props.onComplete}
                          item={task} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListItem;
