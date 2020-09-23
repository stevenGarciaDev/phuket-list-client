import React, {
  Component
} from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {
  Link
} from 'react-router-dom';
import Post from '../components/post';
import {
  getFeedPosts
} from '../services/postService';
import {
  getCurrentUser
} from "../services/authService";
import {
  getUserBIO, getUserPHOTO
} from "../services/userService";
import {
  getListItems,
} from "../services/bucketListService";
import {
  getFriends
} from "../services/friendshipService";
import {
  retrieveMessageGroups
} from "../services/messageService";
import CircularProgressBar from '../components/CircularProgressBar';


class UserActivityPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postLimit: 10,
      postSkip: 0,
      feedEnd: false,
      listItems: [],
      totalComplete: 0,
      totalIncomplete: 0,
      friends: [],
      profileAvatar: "",
      profileBio: "",
      messageGroups: [],
    }
  };

  async componentDidMount() {
    // get all post from user's associated group
    // sort chronological
    const jwt = localStorage.getItem("token");

    // Get user profile pic and bio
    const user = getCurrentUser();
    const userBio = await getUserBIO(user);
    this.setState({profileBio: userBio });
    const userPhoto = await getUserPHOTO(user);
    this.setState({profileAvatar: userPhoto });

    // load user's friend list
    const friends = await getFriends(user.email);
    const friendList = friends.data;

    this.setState({friends: friendList});

    // load user's message groups
    const msggroups = await retrieveMessageGroups(user);
    const msggroupsList = msggroups.data;
    this.setState({messageGroups: msggroupsList});
    console.log(this.state.messageGroups[0]);

    // Get user list items
    const items = await getListItems(user, jwt);
    const listItems = items.data[0].listItems;
    this.setState({ listItems: listItems });

    for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].isCompleted) {
        this.setState({totalComplete: this.state.totalComplete + 1});
      } else {
        this.setState({totalIncomplete: this.state.totalIncomplete + 1});
      }
    }

    // Load user's feed
    this.loadPosts(jwt, this.state.postLimit, this.state.postSkip);

  };

  async loadPosts(jwt, limit, skip) {
    // Get user feed posts
    const feed = await getFeedPosts(jwt, limit, skip);
    this.setState({posts: feed});
  }

  async loadMorePosts() {
    if (!this.state.feedEnd) {
      const jwt = localStorage.getItem("token");
      const newSkip = this.state.postLimit;
      const newLimit = this.state.postLimit + 10
      this.setState({postSkip: newSkip});
      this.setState({postLimit: newLimit});

      // Get more posts
      const feed = await getFeedPosts(jwt, newLimit, newSkip);
        if (feed.length === 0) {
          this.setState({feedEnd: true});
          return;
        }
      this.setState({posts: this.state.posts.concat(feed)});
    }
  }


  render() {
    const { user } = this.props;

    return (
      <div className="activity-feed-content">
          <div className="row nopadding">

            <div className="activity-feed-user-info col-md-3">
              <div className="sticky">
                <div className="activity-feed-user-info-module">
                  <div className="activity-feed-user-info-card-bg row nopadding">
                  </div>
                  <div className="activity-feed-user-info-card-body row">
                    {this.state.profileAvatar ?
                      (<img alt="profile" src={this.state.profileAvatar} className="activity-feed-user-info-card-avatar" />)
                      :
                      (<img alt="default profile" src="https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg" className="activity-feed-user-info-card-avatar" />)
                    }
                    <p className="activity-feed-user-info-card-name">{`${user.name}`}</p>
                  </div>
                  <div className="activity-feed-user-info-card-bio text-center row"> 
                    {this.state.profileBio ?
                      (<small>{`${this.state.profileBio}`}</small>)
                      :
                      (<small>You don't have a bio yet!</small>)
                    }
                  </div>
                </div>

                <div className="activity-feed-user-info-module">
                  <p className="module-title">My Groups</p>
                  {this.state.listItems.length > 0 &&
                        this.state.listItems.map(item => (
                          <Link to={`/taskgroup/${item._id}`} key={item._id}>
                            <div className="activity-feed-user-groups-item">
                              <small>{item.taskName}</small>
                            </div>
                          </Link>
                  ))}
                </div>
                <div className="activity-feed-user-info-module">
                  <p className="module-title">My Bucket List</p>
                  <div className="col-md-12 nopadding">
                    <CircularProgressBar
                      strokeWidth="5"
                      sqSize="150"
                      percentage={this.state.listItems.length > 0 ?
                        (((this.state.totalComplete) /
                        (this.state.totalComplete + this.state.totalIncomplete) * 100).toFixed(0))
                        :
                        0
                      }/>
                  </div>
                  <div className="row nopadding">
                    <div className="col-md-6">
                      <div><span className="circle-text-bottom">{this.state.totalComplete}</span></div>
                      <div><small>Completed tasks</small></div>
                    </div>
                    <div className="col-md-6">
                      <div><span className="circle-text-bottom">{this.state.totalIncomplete}</span></div>
                      <div><small>Incomplete tasks</small></div>
                    </div>
                    <div className="col-md-12" style={{marginTop: '10px'}}>
                      <Link to={`/bucketList`}>
                        <button className="btn btn-info">Manage My Bucket List</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-feed-body col-md-6">
              <div className="activity-feed-body-module module-no-bg">
                { this.state.posts.length > 0 && this.state.posts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    author={post.author}
                    image={post.image}
                    dateCreated={post.dateCreated}
                    text={post.text}
                    likes={post.likes}
                    comments={post.comments}

                  />
                ))}
                { !this.state.feedEnd ?
                  (
                    <div className="activity-feed-body-load">
                      <small><i className="fa fa-level-down" aria-hidden="true"></i>Load More</small>
                      <BottomScrollListener onBottom={this.loadMorePosts.bind(this)} />
                    </div>
                  )
                  :
                  (
                    <div className="activity-feed-body-load">
                      <small>Nothing else to show... :(</small>
                    </div>
                  )
                }
              </div>
            </div>



            <div className="activity-feed-friends col-md-3">
              <div className="sticky">
                <div className="activity-feed-friends-module">
                  <p className="module-title">My Friends</p>
                  {this.state.friends.length > 0 &&
                        this.state.friends.map(item => (
                          <Link to={`/profile/${item.userid}`} key={item._id}>
                            <div className="activity-feed-user-groups-item">
                              <small>{item.username}</small>
                            </div>
                          </Link>
                  ))}
                </div>

                <div className="activity-feed-friends-module">
                  <p className="module-title">My Message Groups</p>
                  {this.state.messageGroups.length > 0 &&
                        this.state.messageGroups.map(item => (
                          <Link to={`/messages/`} key={item._id}>
                            <div className="activity-feed-user-messages-item">
                              <small className="text-left">Latest Message:</small>
                              <br />
                               { item.messages.length > 0 ?
                                ( (item.messages[item.messages.length-1].message.length > 24) ?
                                    (
                                    <small>
                                      {`"${item.messages[item.messages.length-1].message.substring(0, 24)}..."`}
                                    </small>
                                  ) :
                                  (
                                    <small>"{item.messages[item.messages.length-1].message}"</small>
                                    ) )
                                :
                                ( <small>"No messages..."</small> )
                               }
                            </div>
                          </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default UserActivityPage;
