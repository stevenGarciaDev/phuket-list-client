import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Joi from "joi-browser";
import { deleteUser,confirmPassword } from "../services/userService";
import { getCurrentUser } from "../services/authService";

class ModalDeleteAccount extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	confirmPass: "",
	    	errorConfirmPass: null,
        };
        this.onDelete = this.onDelete.bind(this);
    }
    
    async onDelete() {
        // on click on confirmation button
          // get the current user
          const user = getCurrentUser();
          // call api to delete the user
          const userDeleted = await deleteUser(user._id);
          console.log("userDeleted", userDeleted);
          localStorage.removeItem('token');
          window.location = '/login';
          
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
            console.log(this.state.confirmPass);
            const user = getCurrentUser();
            //onsole.log(user._id);
            const userId = user._id;
            const response = await confirmPassword(userId, this.state.confirmPass);
            console.log(response.data);
            if (response.data) {

                this.onDelete();
            } else {
                
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
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required
                	id="password-confirm"
                	type="password"
                    onChange={this.inputConfirmPassword}
                    isInvalid={!this.state.errorConfirmPass}
                	/>
                    <Form.Control.Feedback type="invalid">
            Provide correct password.
          </Form.Control.Feedback>
                {this.state.errorConfirmPass}
              </Form.Group>
              <Button className="d-flex justify-content-start" variant="warning" type="submit">
                Confirm
              </Button>
            </Form>
	      </React.Fragment>
	    );
	}


}

export default ModalDeleteAccount;