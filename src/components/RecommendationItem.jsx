import React from 'react';

const RecommendationItem = (props) => {
  return (
    <div className="RecommendationItem">
      <div className="recommendation-icon">
        <i className="fas fa-utensils"></i>
      </div>
      <div className="recommendation-content">
        <h3>Chocolate Factory</h3>
        <p>Long Beach, California</p>
      </div>
    </div>
  );
}

export default RecommendationItem;
