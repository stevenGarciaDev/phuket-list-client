import React from 'react';

const AlertMessage = (props) => {
  const { text } = props;

  return (
    <div className="alert alert-success col-md-6 offset-md-3">
      <strong>{text}</strong>
    </div>
  );
}

export default AlertMessage;
