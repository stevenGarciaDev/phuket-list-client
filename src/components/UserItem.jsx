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
		console.log("user", user);
		const { hovering } = this.state;

		// console.log("user icon ? ", user.photo !== undefined);
		// console.log("user.photo", user.photo);

		return (
			<React.Fragment>
				<div className="task-group-members-user-item"
					key={user._id}
					onMouseOver={this.toggleHover}
					onMouseOut={this.toggleHover}>
					<div>
						<Link to={`/profile/${user._id}`}>

							{user.photo ?
	              <img
	                  className="post-module-profile-img"
	                  src={user.photo}
	                  alt="Img" />
	              :
	              <img
	                  className="post-module-profile-img"
	                  src="https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"
	                  alt="Img" />
	            }

						</Link>

					</div>

				</div>

				{ hovering &&
				
				
					<div className= "Hover-Card">
					<UserCard
						id={user._id}
						name={user.name}
						bio={user.bio}
						isPrivateProfile={user.isPrivateProfile}
						photo={user.photo}
						hovering={this.state.hovering}
					/>
					</div>
					
				
				}
			</React.Fragment>
    );
  }
}

export default UserItem;
