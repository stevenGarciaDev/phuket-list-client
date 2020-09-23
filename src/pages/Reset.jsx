import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import PropTypes from 'prop-types';
import { resetPassword,updatePassword } from "../services/userService";
class Reset extends Form {

    constructor(props) {
        super(props);
        this.state = {  
          data: { 
                Password: "",
                  confirmPassword: ""},
          errors: {}
        };
      }

    schema = {
        Password: Joi.string()
        .required()
        .label("Password"),
        confirmPassword: Joi.string()
        .required()
        .label("confirmPassword")
    };
    async componentDidMount() {
        const response = await resetPassword({params: {
            resetPasswordToken: this.props.match.params.token,
          },
        })
        
          if(response.data.message === 'password reset link a-ok'){
              this.setState({
                 email: response.data.email,
              });
              console.log(this.state);
          }
          else{
            console.log(response);
            this.setState({
            })
          }
        }
        doSubmit = async () => {
          // Call the server
          try {
            const { data } = this.state;
            const email = this.state.email;
            console.log(data.Password);
            if(data.Password === data.confirmPassword){
              const response = await updatePassword({params: {email,data}});
              if(response.data === "Password changed"){
               alert("Password Changed");
            }
               else{
                alert("Wrong User, could not change password");
              }
              window.location = "/login";
            }
            else{
              alert("Passwords dont match");
            }
            
            
            
            //window.location = "/login";
          }
          catch (ex) {
            if (ex.response && ex.response.status === 400) {
              const errors = {...this.state.errors};
              errors.name = ex.response.data; // get the error from the server
              this.setState({ errors });
            }
          }
        };
    /*
    async componentDidMount() {
        await axios
          .get('http://localhost:3000/resetPassword', {
            params: {
              resetPasswordToken: this.props.match.params.token,
            },
          })
          .then(response => {
            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
              this.setState({
                username: response.data.username,
                updated: false,
                isLoading: false,
                error: false,
              });
            }
          })
          .catch(error => {
            console.log(error.response.data);
            this.setState({
              updated: false,
              isLoading: false,
              error: true,
            });
          });
      }
      */
    render() {
        return (
          <React.Fragment>
            <div className="jumbotron" id="auth-jumbotron"></div>
    
            <div className="authenticate-form">
                <h1>Reset Password</h1>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("Password", "Password", "password")}
                {this.renderInput("confirmPassword", "confirmPassword", "password")}
                  {this.renderButton("Reset")}
                </form>
            </div>
          </React.Fragment>
        );
      }
      
    

}
Reset.PropTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
export default Reset;