import React, { Component } from "react";
import { Link } from 'react-router-dom';

class UserCard extends Component {
	constructor(props) {
	    super(props);
	    this.state = {};
  	}

  	render() {
  		const { id, name, bio, isPrivateProfile } = this.props;

  		return (
			
			<span> 
				<div classname = "Hover-Card">
						<div  className="task-group-members-user-item-card-container">
							<div className="task-group-members-user-item-card">
				                <div className="activity-feed-user-info-card-bg row nopadding">
				                </div>
				                <div className="activity-feed-user-info-card-body row">
									  {/*TODO: Get avatar*/}
									  
				                    <img alt="default profile" src="https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg" className="activity-feed-user-info-card-avatar" />
									
								    <p className="activity-feed-user-info-card-name">{`${name}`}</p>
				                </div>
				                <div  className="activity-feed-user-info-card-bio">
								
				                    { isPrivateProfile ?
				                    	(<small ><i className="fa fa-lock"></i>{` User's profile is private...`}</small>)
				                    	:
				                    	( bio.length > 0 ?
				                    		(<small >{bio}</small>)
				                    		:
				                    		(<small>{`User does not have a bio...`}</small>)
				                    	)
				                    }
				                </div>
			                </div>
						</div>


						</div>
						
			</span>
			
	    );
  	}
}

export default UserCard;
