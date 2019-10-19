import React, { Component } from "react";


class UserCard extends Component {
	constructor(props) {
	    super(props);
	    this.state = {};
  	}

  	render() {
  		const { id, hovering } = this.props;
  		
  		return (
			<span>
				{ hovering && 
					(
						<div className="task-group-members-user-item-card">
							{id}
						</div>
					)
				}
			</span>
	    );
  	}
}

export default UserCard;
