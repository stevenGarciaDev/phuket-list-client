import React from 'react';

const RecommendationItem = (props) => {
  return (
    <div className="RecommendationItem">
      <div className="recommendation-icon">
        <i className="fas fa-utensils"></i>
      </div>
      <div className="recommendation-content">
        <h3>{props.name}</h3>
        <p>{props.location}</p>
      </div>
    </div>
  );
}

export default RecommendationItem;
