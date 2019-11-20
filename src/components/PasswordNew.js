import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { newPassword }from '../services/userService';

class PasswordNew extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	oldPass: "",
	    	newPass: "",
	    	confirmPass: "",
	    	errorOldPass: null,
	    	errorNewPass: null,
	    	errorConfirmPass: null,
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

	validatePass = password => {
		if (password.length > 4 && password.length < 255) {
			return true;
		} else {
			return false;
		}
	}

	handleSubmit = async(e) =>  {
		try {
			e.preventDefault();

			if (!this.validatePass(this.state.oldPass)) {
				this.setState({errorOldPass: "Invalid password"});
			} else if (!this.validatePass(this.state.newPass)) {
				this.setState({errorNewPass: "Invalid password"});
			} else if (!this.validatePass(this.state.confirmPass)) {
				this.setState({errorConfirmPass: "Invalid password"});
			} else {
				this.setState({errorOldPass: null, errorNewPass: null, errorConfirmPass: null});
				if (this.state.newPass !== this.state.confirmPass) {
					this.setState({errorConfirmPass: "Passwords do not match"})
				} else {
					const response = await newPassword(this.props.userId, this.state.oldPass, this.state.newPass);
					if (response.data) {
						alert("Password was changed!");
					} else {
						alert("Password could not be changed.");
					}
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
                {this.state.errorOldPass}

              </Form.Group>

              <hr />

              <Form.Group>

                <Form.Label>New Password</Form.Label>
                <Form.Control required
                	id="password-new"
                	type="password"
                	onChange={this.inputNewPassword}
                	/>
                {this.state.errorNewPass}

                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required
                	id="password-confirm"
                	type="password"
                	onChange={this.inputConfirmPassword}
                	/>
                {this.state.errorConfirmPass}

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
