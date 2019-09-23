import React, { Component } from 'react';

class MessageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onChange = (e) => {
    const enteredText = e.target.value;
    this.setState({ message: enteredText });
  }

  resetText = () => {
    this.setState({ message: "" });
  }

  render() {
    const { message } = this.state;

    return (
      <form>
        <div className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => this.onChange(e)}
            className="form-control"
            placeholder="Message..."
            id="message-input"
          />
          <button
            className="btn btn-info"
            onClick={(e) => {
              this.props.sendMessage(e, message);
              this.resetText();
            }}>
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default MessageForm;
