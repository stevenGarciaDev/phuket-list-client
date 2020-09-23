import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: { name: "", email: "", password: "" },
      errors: {}
    };
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Full Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      const response = await register(data);
      localStorage.setItem('token', response.headers['x-auth-token']);
      window.location = "/bucketList";
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.name = ex.response.data; // get the error from the server
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron" id="auth-jumbotron"></div>

        <div className="authenticate-form">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Full Name")}
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
