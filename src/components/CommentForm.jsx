import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { createComment } from '../services/commentService';

class CommentForm extends Form {

  constructor(props) {
    super(props);
    this.state = {
      data: { text: "" },
      errors: {}
    };
  }

  schema = {
    text: Joi.string().max(144).required()
  };

  doSubmit = async () => {
    try {
      const { postId } = this.props;
      const { text } = this.state.data;
      const jwt = localStorage.getItem("token");
      const response = await createComment(text, postId, jwt);
      this.props.onNewComment(response);
      this.setState({ data: {text: ""} });
    } catch (ex) {
      console.log("Unable to create comment", ex);
    }
  };

  render() {
    return (
      <div className="comment-container">
        <form onSubmit={this.handleSubmit} className="comment-input">
          {this.renderInput("text", "", "text", "Add a comment...")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default CommentForm;
