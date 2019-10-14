import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Joi from "joi-browser";
import { newPassword }from '../services/userService';

class PasswordNew extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	oldPass: "",
	    	newPass: "",
	    	confirmPass: "",
	    };
	}

	inputOldPassword = e => {
		try {
			this.setState({oldPass: e.target.value});
		} catch (e) {
			console.log("error: ", e);
		}
	}

	inputNewPassword = e => {
		try {
			this.setState({newPass: e.target.value});
		} catch (e) {
			console.log("error: ", e);
		}
	}

	inputConfirmPassword = e => {
		try {
			this.setState({confirmPass: e.target.value});
		} catch (e) {
			console.log("error: ", e);
		}
	}

	handleSubmit = async(e) =>  {
		try {
			e.preventDefault();

			if (this.state.newPass != this.state.confirmPass) {
				alert("Passwords do not match!");
				e.reset();
			} else {
				const response = await newPassword(this.props.userId, this.state.oldPass, this.state.newPass);
				console.log(response.data);
				if (response.data) {
					alert("Password was changed!");
				} else {
					alert("Password could not be changed.");
				}
			}
		} catch (e) {
			console.log("error: ", e);
		}
	}

	render() {
	    return (
	      <React.Fragment>
	        <Form onSubmit={this.handleSubmit}>

              <Form.Group>

                <Form.Label>Old Password</Form.Label>
                <Form.Control required
                	id="password-old"
                	type="password"
                	onChange={this.inputOldPassword} 
                	/>

              </Form.Group>

              <hr />

              <Form.Group>

                <Form.Label>New Password</Form.Label>
                <Form.Control required
                	id="password-new"
                	type="password" 
                	onChange={this.inputNewPassword}
                	/>

                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required
                	id="password-confirm"
                	type="password"
                	onChange={this.inputConfirmPassword}
                	/>

              </Form.Group>

              <Button className="d-flex justify-content-start" variant="warning" type="submit">
                Change Password
              </Button>
            </Form>
	      </React.Fragment>
	    );
	}


}

export default PasswordNew;