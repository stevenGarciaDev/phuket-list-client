import React, {
	Component
} from "react";
import {
  Link
} from 'react-router-dom';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Post from '../components/post';
import {
	getUserBasic, getUserBioByID, getUserPhotoByID
} from '../services/userService';
import {
	getUserPostsByID
} from '../services/postService';
import {
  getListItemsByID,
} from "../services/bucketListService";

import { connect } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selectors';

class PublicProfile extends Component {
	constructor(props) {

	    super(props);

	    this.state = {
	      reader_id: "",
	      profile_id: this.props.match.params.user_id,
	      profile_isActive: true,
	      profile_isPrivate: false,
	      profile_name: "",
	      profile_bio: "",
	      profile_avatar: "",
	      profile_posts: [],
	      profile_posts_limit: 10,
	      profile_posts_skip: 0,
	      profile_listItems: [],
	      feedEnd: false,
	    };

	}

	async componentDidMount() {
		try {
			const { currentUser: reader } = this.props;
	    	if (reader) {
	    		this.setState({reader_id: reader._id});
	    	}
		} catch (e) {
			console.log("error: ", e);
		}

		// Get JWT
		const jwt = localStorage.getItem("token");

		// Get user
		const user = await getUserBasic(this.state.profile_id);

		// Get user's name
		this.setState({profile_name: user.data.name});

		// Get privacy status
		this.setState({profile_isPrivate: user.data.isPrivateProfile});

		if (!this.state.profile_isPrivate || (this.state.reader_id === this.state.profile_id) ) {
			const userBio = await getUserBioByID(this.state.profile_id);
		    this.setState({profile_bio: userBio.data[0].bio });
		    const userPhoto = await getUserPhotoByID(this.state.profile_id);
		    this.setState({profile_avatar: userPhoto.data[0].photo });
		    if (!this.state.profile_avatar) {
		    	this.setState({profile_avatar: "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg" });
		    }
		    if (!this.state.profile_bio) {
		    	this.setState({profile_bio: "No bio..." });
		    }

			// Get Posts
			this.loadPosts(jwt,
				this.state.profile_id,
				this.state.profile_posts_limit,
				this.state.profile_posts_skip);
			// Get List Items
			const items = await getListItemsByID(this.state.profile_id, jwt);
		    const listItems = items.data[0].listItems;
		    this.setState({ profile_listItems: listItems });
		} else {
			//this.setState({profile_bio: "User account is private" });
			this.setState({profile_avatar: "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg" });
		}
	}

	async loadPosts(jwt, id, limit, skip) {
	    // Get user feed posts
	    const feed = await getUserPostsByID(jwt, id, limit, skip);
	    this.setState({profile_posts: feed.data});
	}

	async loadMorePosts() {
	    if (!this.state.feedEnd) {
	      const jwt = localStorage.getItem("token");
	      const newSkip = this.state.profile_posts_limit;
	      const newLimit = this.state.profile_posts_limit + 10
	      this.setState({profile_posts_skip: newSkip});
	      this.setState({profile_posts_limit: newLimit});

	      // Get more posts
	      const feed = await getUserPostsByID(jwt, this.state.profile_id, newLimit, newSkip);
	        if (feed.data.length === 0) {
	          this.setState({feedEnd: true});
	          return;
	        }
	      this.setState({profile_posts: this.state.profile_posts.concat(feed.data)});
	    }
	  }

	render() {
		return(
			<div className="public-profile-content">
				<div className="public-profile-basic-bg row nopadding">
                </div>
				<div className="public-profile-basic row nopadding">
					<div className="col-md-12 nopadding">

						<img alt="profile" src={this.state.profile_avatar} className="public-profile-avatar" />
						<h2 className="module-title">{this.state.profile_name}</h2>
						<div className = "widthless">
						<small>{`${this.state.profile_bio}`}</small>
						</div>

					</div>
					<div className="col-md-12 nopadding">

					</div>
				</div>
			{/* Only loads reset of page if profile is NOT private and READER != Profile Owner */}
				{ (!this.state.profile_isPrivate || (this.state.reader_id === this.state.profile_id) ) ?
					(
						<div className="row nopadding">
							<div className="public-profile-bucket-list-module col-md-4">
								<p className="module-title">{this.state.profile_name}'s Bucket List</p>
								{this.state.profile_listItems.length > 0 &&
				                    this.state.profile_listItems.map(item => (
				                    <Link to={`/taskgroup/${item._id}`} key={item._id}>
				                         <div className="activity-feed-user-groups-item">
				                            <small>{item.taskName}</small>
				                        </div>
				                	</Link>
				                ))}
							</div>
							<div className="public-profile-posts col-md-8">
								{ this.state.profile_posts.length > 0 && this.state.profile_posts.map((post) => (
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
								{ (!this.state.feedEnd) ?
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
					)
					:
					(
						<div className="activity-feed-body-load">
							This user's profile is private.
						</div>)

				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state)
  });
  
  export default connect(mapStateToProps)(PublicProfile);
