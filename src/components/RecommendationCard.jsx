import React, { Component } from "react";
//import { Link } from 'react-router-dom';

class RecommendationCard extends Component {
	constructor(props) {
	    super(props);
	    this.state = {};
  	}

  	render() {
  		const { name,location } = this.props;

  		return (
			
			<span> 
				<div className = "Hover-Card">
						<div  className="task-group-members-user-item-card-container">
							<div className="task-group-members-user-item-card">
				                
				                <div className="activity-feed-user-info-card-body ">
									  {/*TODO: Get Pictures*/}
								    <p className="activity-feed-Recommendation-info-card-name">{`${name}`}</p>
				                </div>
                                 <p className="activity-feed-Recommendation-info-card-Location">{`${location}`}</p>
			                </div>
						</div>
				</div>
						
			</span>
			
	    );
  	}
}

export default RecommendationCard;
