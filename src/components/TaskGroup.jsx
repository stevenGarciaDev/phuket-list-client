import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import ActivityFeed from "./ActivityFeed";
import UserItem from "./UserItem";
import { getCurrentUser } from "../services/authService";
import {
	getListItems,
	getListItem,
	findOrCreateTask,
	getTaskUsers
} from "../services/bucketListService";
import { getPublicuser } from "../services/userService";

class TaskGroup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      task_id: this.props.match.params.task_id,
	      task_name: '',
	      user_hastask: false,
	      message: '',
	      members: [],
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
		let members = await this.getMembers();
		this.setState({ members });
	}

  	getMembers = async () =>  {
  		// Get members with this task in bucketlist
		const membersresponse = await getTaskUsers(this.state.task_id);
	    
	    const members = [];
	    for (var i = 0; i < membersresponse.data.length; i++) {
	    	var member = membersresponse.data[i];
	    	const response = await getPublicuser(member.owner);
	    	members.push(response.data[0]);
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
		const { task_name, task_id, user_hastask, message, members } = this.state;
		return (
			<React.Fragment>
				<div className="jumbotron task-group-jumbotron"><h1 className="shadow-text bold-text">{`"${task_name}" Group`}</h1>
					{/* TODO: Add user count */}
					<h3 className="shadow-text">{`${message}`}</h3>
				</div>
				<div className="task-group-content">
          			<div className="row nopadding">
          				<div className="task-group-feed col-md-9">
          					<ActivityFeed taskId={task_id} />
          				</div>
          				<div className="task-group-members col-md-3">
          					<div className="sticky">
          						<div className="task-group-members-nav">
									<h3>Members</h3>
									<div className="task-group-members-list">
											{members.length > 0 && members.map ( item => 
												<UserItem
													key={item._id}
													user={item}
												/>
											)}
									</div>
								</div>
          					</div>
          				</div>
          			</div>
          		</div>
			</React.Fragment>
		);
	}

}

export default TaskGroup;
