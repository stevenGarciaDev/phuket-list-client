import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import BucketList from './components/BucketList';
import TaskGroup from './components/TaskGroup';
import FlexNavbar from './components/FlexNavbar';
import LoginForm from "./components/LoginForm";
import Forgot from "./components/Forgot";
import RegisterForm from "./components/RegisterForm";
import UserActivityPage from "./components/UserActivityPage";
import FriendsList from "./components/FriendsList";
import MessagePage from "./components/MessagePage";
import Profile from "./components/Profile";
import PublicProfile from "./components/PublicProfile";
import Settings from "./components/Settings";
import Logout from './components/logout';
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";
import Reset from './components/Reset';

class App extends Component {

  state = {
    user: ''
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user) this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <FlexNavbar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/home" component={HomePage} />
            <ProtectedRoute
              path="/bucketList"
              render={(props) => <BucketList user={this.state.user} {...props} /> }
            />
            <Route path="/taskgroup/:task_id" component={TaskGroup} />
            <Route path="/profile/:user_id" component={PublicProfile} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/Forgot" component={Forgot} />
            <Route path="/Reset/:token" component={Reset} />
            <Route path="/userActivityPage" render={(props) => <UserActivityPage user={this.state.user} /> } />
            <Route path="/friends" component={FriendsList} />
            <Route path="/messages" component={MessagePage} />
            <Route path="/myProfile" render={(props) => <Profile user={this.state.user} /> } />
            <Route path="/settings" component={Settings} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
