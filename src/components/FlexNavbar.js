import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class FlexNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            isConnectCollapsed: false,
            isAccountCollapsed: false
        };
        this.onTabDropdown = this.onTabDropdown.bind(this);
        this.onMenuDropdown = this.onMenuDropdown.bind(this);
        this.hideItem = this.hideItem.bind(this);
    }
    
    onTabDropdown(name) {
        let otherMenu = (name === 'isConnectCollapsed') ? 'isAccountCollapsed' : 'isConnectCollapsed';
        this.setState({
            [name]: !this.state[name],
            [otherMenu]: false
        });
    }

    onCloseTabDropdown() {
        this.setState({
            isConnectCollapsed: false,
            isAccountCollapsed: false
        });
    }

    onMenuDropdown() {
        console.log("onMenuDropdown");
        this.setState({ 
            displayMenu: !this.state.displayMenu
        });
    }

    hideItem() {
        const { displayMenu } = this.state;
        return displayMenu ? '' : 'hidden-display-item';
    }
    
    render() {
        const { user } = this.props;
        const { displayMenu, isConnectCollapsed, isAccountCollapsed } = this.state;

        return ( 
            <nav>         
            

                <i 
                    id="hamburger-menu"
                    className="fas fa-bars fa-2x"
                    onClick={() => this.onMenuDropdown()}
                    ></i>

                {user ?
                    <div className="FlexNavbar">
                        <div className={this.hideItem()}>
                            <NavLink 
                                className="nav-link" to="/bucketList" 
                                onClick={() => this.onCloseTabDropdown()}
                            >MyList <span className="sr-only">(current)</span></NavLink>
                        </div>
                        <div className={this.hideItem()}>
                            <NavLink 
                                className="nav-link" to="/userActivityPage"
                                onClick={() => this.onCloseTabDropdown()}>
                                Activity Page
                            </NavLink>
                        </div>
                        <div className={this.hideItem()}>
                            <div 
                                className="nav-link toggle-bar" 
                                onClick={() => this.onTabDropdown('isConnectCollapsed')}
                                >
                                Connect 
                                <i className={`fas fa-chevron-${isConnectCollapsed ? 'up': 'down'}`}></i>
                            </div>
                            {isConnectCollapsed && 
                                <div className="dropdown-nav connect">
                                    <NavLink 
                                        className="nav-link dropdown-item" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to="/friends">Friends</NavLink>
                                    <NavLink 
                                        className="nav-link dropdown-item" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to="/messages">Messages</NavLink>
                                </div>
                            }
                        </div>
                        <div className={this.hideItem()}>
                            <div 
                                className="nav-link toggle-bar" 
                                onClick={() => this.onTabDropdown('isAccountCollapsed')}>
                                Account <i className={`fas fa-chevron-${isAccountCollapsed ? 'up': 'down'}`}></i>
                            </div>
                            {isAccountCollapsed && 
                                <div className="dropdown-nav account">
                                    <NavLink 
                                        className="nav-link dropdown-item" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to={`/profile/${user._id}`}>My Profile</NavLink>
                                    <NavLink 
                                        className="nav-link dropdown-item" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to="/myProfile">Edit Profile</NavLink>
                                    <NavLink 
                                        className="nav-link dropdown-item" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to="/settings">Setting</NavLink>
                                    <NavLink 
                                        className="nav-link" 
                                        onClick={() => this.onCloseTabDropdown()}
                                        to="/logout">Sign out</NavLink>
                                </div>
                            }
                        </div>
                    </div>
                :
                    <div className="FlexNavbar display-items">
                        
                        <div className={this.hideItem()}>
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </div>

                        <div className={this.hideItem()}>
                            <NavLink className="nav-link" to="/register">
                                Register
                            </NavLink>
                        </div>
                    </div>
                }

          
           
            </nav>     
        );
    }
}

export default FlexNavbar;