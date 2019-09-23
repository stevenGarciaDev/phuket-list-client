import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

class Navbar extends Component {

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">

          {user &&
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bucketList">MyList <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/userActivityPage">
                  Activity Page
                </NavLink>
              </li>

              <NavDropdown title="Connect" className="basic-nav-dropdown">
                <Link className="nav-link dropdown-item" to="/friends">Friends</Link>
                <Link className="nav-link dropdown-item" to="/messages">Messages</Link>
              </NavDropdown>

              <NavDropdown title="Account" className="basic-nav-dropdown">
                <Link className="nav-link dropdown-item" to={`/profile/${user._id}`}>My Profile</Link>
                <Link className="nav-link dropdown-item" to="/myProfile">Edit Profile</Link>
                <Link className="nav-link dropdown-item" to="/settings">Setting</Link>

                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/logout">Sign out</NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          }

          {!user &&
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          }

          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
