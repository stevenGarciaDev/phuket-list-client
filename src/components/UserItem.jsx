import React, { Component } from "react";
import UserCard from "./UserCard";
import { Link } from 'react-router-dom';


class UserItem extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			hovering: false
		}
  	}

  	toggleHover = () => {
		this.setState({hovering: !this.state.hovering})
	}

  	render() {
  		const { user } = this.props;
  		return (
			<React.Fragment>
				<div className="task-group-members-user-item"
					key={user._id}
					onMouseEnter={this.toggleHover} 
					onMouseLeave={this.toggleHover}>
					<Link to={`/profile/${user._id}`}>{user.name}</Link>
				</div>
				<UserCard
					id={user._id}
					name={user.name}
					bio={user.bio}
					isPrivateProfile={user.isPrivateProfile}
					hovering={this.state.hovering}
				/>
			</React.Fragment>
	    );
  	}
}

export default UserItem;

