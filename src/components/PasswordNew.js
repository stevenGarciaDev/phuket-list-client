import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Joi from "joi-browser";

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
		this.setState({oldPass: e.target.value});
	}

	inputNewPassword = e => {
		this.setState({newPass: e.target.value});
	}

	inputConfirmPassword = e => {
		this.setState({confirmPass: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();

		if (this.state.newPass != this.state.confirmPass) {
			alert("Passwords do not match!");
		} else {
			console.log("Old: " + this.state.oldPass);
			console.log("New: " + this.state.newPass);
		}
	}

	render() {
	    const { userId } = this.props;

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