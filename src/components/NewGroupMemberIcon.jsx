import React from 'react';

const NewGroupMemberIcon = (props) => {
  return (
    <div className="new-member">
      {props.name}
      <i onClick={() => props.onRemoveMember(props.name)} className="fa fa-times new-member-remove-icon" aria-hidden="true"></i>
    </div>
  );
}

export default NewGroupMemberIcon;
