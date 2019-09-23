import React from 'react';

const Like = (props) => {
  const { hasLiked, totalLikes } = props;

  let amountOfLikes;
  try {
    amountOfLikes = totalLikes.length;
  } catch (ex) {
    amountOfLikes = 0;
  }

  return (
    <div className="like-container">
      { hasLiked ?
        <i onClick={props.onClick} className="fa fa-thumbs-up thumbs-up-icon fa-2x" aria-hidden="true"></i>
      :
        <i onClick={props.onClick} className="fa fa-thumbs-o-up fa-2x" aria-hidden="true"></i>
      }
      <span>{amountOfLikes}</span>
    </div>
  );
};

export default Like;
