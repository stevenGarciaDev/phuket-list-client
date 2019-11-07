import React from 'react';

const RecommendationItem = (props) => {
  return (
    <div className="RecommendationItem">
      <div className="recommendation-icon">
        <i className="fas fa-utensils"></i>
      </div>
      <div className="recommendation-content">
        {props.name.length < 23 ?
            <h3>{props.name}</h3>
          :
            <h3>{`${props.name.substr(0, 15)}...`}</h3>
        }
        <p>{props.location}</p>
      </div>
    </div>
  );
}

export default RecommendationItem;
