
import React, { Component } from "react";
import RecommendationCard from "./RecommendationCard";

class RecommendationItem extends Component {
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
  	const { name,location } = this.props;
		//console.log("user", user);
		const { hovering } = this.state;

		// console.log("user icon ? ", user.photo !== undefined);
		// console.log("user.photo", user.photo);

		return (
      <div className="RecommendationItem" 
      onMouseOver={this.toggleHover}
      onMouseOut={this.toggleHover}>
        <div className="recommendation-icon">
          <i className="fas fa-utensils"></i>
        </div>
        <div className="recommendation-content">
          {name.length < 23 ?
              <h3>{name}</h3>
            :
              <h3>{`${name.substr(0, 15)}...`}</h3>
          }
          <p>{location}</p>
        </div>
        { hovering &&
				
				
        <div className= "Hover-Card">
        <RecommendationCard
          name={name}
          location={location}
        />
        </div>
        
      
      }
      </div>
      
    );
  }
}



export default RecommendationItem;
