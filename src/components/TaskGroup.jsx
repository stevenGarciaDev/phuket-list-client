import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import ActivityFeed from "./ActivityFeed";
import UserItem from "./UserItem";
import RecommendationItem from "./RecommendationItem";
import { getCurrentUser } from "../services/authService";
import {
	getListItems,
	getListItem,
	findOrCreateTask,
	getTaskUsers,
	getRecentTaskUsers
} from "../services/bucketListService";
import {
	getPublicuser,
	getUserBasic } from "../services/userService";
import { getRelatedBusinesses } from '../services/yelpService';
import { getCurrentLocation } from '../services/locationService';
import { getRecommendations } from '../services/recommendationService';

class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	      user_hastask: false,
	      message: '',
	      members: [],
				recommendations: []
		};
	}

	async componentDidMount() {
		// User authentication
		const user = getCurrentUser();
	  const jwt = localStorage.getItem("token");

		// Get task name
		const response = await getListItem(this.state.task_id);
    this.setState({task_name: response.data.taskName})

		// Find if user has task
		const tasksresponse = await getListItems(user, jwt);
		const listItems = tasksresponse.data[0].listItems;

		if (this.contains(listItems, "_id", this.state.task_id) ) {
			this.setState({user_hastask: true});
		}

		// Call function to retrieve members
		let members = await this.getRecentMembers();
		this.setState({ members });

		getCurrentLocation().then(async result => {
			console.log("latitude", result.coords.latitude);
			console.log("longitude", result.coords.longitude);
			const latitude = result.coords.latitude;
			const longitude = result.coords.longitude;

			// get recommendation keywords
			const recommendationKeywords = await getRecommendations();
			console.log("recommendationKeywords", recommendationKeywords);

			const term = this.identifySearchTerm(this.state.task_name, recommendationKeywords);
			console.log("term", term);
			if (term) {
				// retrieve recommendations
				let recommendationsData = await getRelatedBusinesses(term.keyword, latitude, longitude);
				console.log("recommendationsData", recommendationsData);
				this.setState({ recommendations: recommendationsData });
			}
		}).catch(error => {
			console.log("ERROR", error);
		});

	}

	getRecentMembers = async () =>  {
		// Get members with this task in bucketlist
		const membersresponse = await getRecentTaskUsers(this.state.task_id);

	    const members = [];
	    for (var i = 0; i < membersresponse.data.length; i++) {
	    	var member = membersresponse.data[i];
	    	const response = await getUserBasic(member.owner);
	    	members.push(response.data);
	    }

	    return members;
	}

  	getMembers = async () =>  {
		// Get members with this task in bucketlist
		const membersresponse = await getTaskUsers(this.state.task_id);

	    const members = [];
	    for (var i = 0; i < membersresponse.data.length; i++) {
	    	var member = membersresponse.data[i];
	    	const response = await getUserBasic(member.owner);
	    	members.push(response.data);
	    }

	    return members;
	}

	contains = (arr, key, val) => {
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) return true;
    }
    return false;
	}

	renderRedirect = () => {
    if (this.state.task_name === '') {
			return (<Redirect to='/not-found' />);
		}
	}

	identifySearchTerm = (name, keywords) => {
		// split the task name
		// identify which of them are found in
		// recommendation database
		const words = name.toLowerCase().split(" ");
		let filtered = [{}];

		for (let word of words) {
			filtered = keywords.filter(k => k.keyword === word);
			if (filtered.length > 0)
				break;
		}
		return filtered.length > 0 ? filtered[0] : null;
	}

	// addTask = () => {
	// 	try {
	//       const user = getCurrentUser();
	//       const jwt = localStorage.getItem("token");

	//       // create a new list item
	//       const response = findOrCreateTask(user, this.state.task_name, jwt);
	//       response.then(result => {
	//         this.setState({user_hastask: true});
	//         // this.setState({message: 'This is now part of your bucket list!'})
	//       });
	//     } catch (ex) {
	//       alert("Unable to add item.");
	//     }
	// }

	render() {
		const { task_name, task_id, user_hastask, message, members, recommendations } = this.state;
		return (
			<React.Fragment>
				<div className="jumbotron task-group-jumbotron"><h1 className="shadow-text bold-text">{`"${task_name}" Group`}</h1>
					{/* TODO: Add user count */}
					<h3 className="shadow-text">{`${message}`}</h3>
				</div>
				<div className="task-group-content">
	  			<div className="row nopadding">
	  				<div className="task-group-feed col-lg-9">
	  					<ActivityFeed taskId={task_id} />
	  				</div>
          	<div className="task-group-members col-lg-3">
          		<div className="sticky">
          			<div className="side-section-nav">
									<h3>Recently Joined Members</h3>
									<div className="task-group-members-list">
											{members.length > 0 && members.map ( item =>
												<UserItem
													key={item._id}
													user={item}
												/>
											)}
									</div>
								</div>
								<section className="recommendations-container">
									<div className="sticky">
										<div className="side-section-nav">
											<h3 className="recommendation-title">Recommendations</h3>
											<div>
												{ recommendations.length > 0 ?
													recommendations.map(r => (
														<RecommendationItem
															name={r.name}
															location={r.location.address1}
														/>
													))
													:
													<div>No recommendations</div>
												}
											</div>
										</div>
									</div>
								</section>
							 </div>
      			</div>
      		</div>
      	</div>
			</React.Fragment>
		);
	}

}

export default TaskGroup;
