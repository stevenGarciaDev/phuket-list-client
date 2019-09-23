import React, { Component } from 'react';

class Logout extends Component {

  componentDidMount() {
    // remove token from local storage
    localStorage.removeItem('token');
    // redirect user to homepage
    window.location = '/login'; // App component will be mounted again
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }

}

export default Logout;
