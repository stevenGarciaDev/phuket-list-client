import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { forgotPassword } from "../services/userService";

class Forgot extends Form {

    constructor(props) {
        super(props);
        this.state = {
          data: { email: ""},
          errors: {}
        };
      }

    schema = {
    email: Joi.string()
        .required()
        .email()
        .label("Email"),
    };



    doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      console.log('test');
      var test = await forgotPassword(data);
      console.log(test);
      window.location = "/login";
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.name = ex.response.data; // get the error from the server
        this.setState({ errors });
      }
    }
  };render() {
        return (
          <React.Fragment>
            <div className="jumbotron" id="auth-jumbotron"></div>

            <div className="authenticate-form">
                <h1>Forgot Password</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "email")}
                  {this.renderButton("Send email")}
                </form>
            </div>
          </React.Fragment>
        );
      }


}
export default Forgot;
