import React, { Component } from 'react';

class ImageInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageToUpload: false
    }
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage() {
    this.props.onChange();
    const { imageToUpload } = this.state;
    console.log("imageToUpload", !imageToUpload);
    this.setState({ imageToUpload: !imageToUpload });
  }

  render() {
    const { imageToUpload } = this.state;
    // get the name of the image as text
    let btnText = (imageToUpload) ? 'imageName' : 'Choose an image...';
    let fontAwesomeIcon = "fa";
    if (imageToUpload) {
      fontAwesomeIcon += " fa-times remove-file";
    } else {
      fontAwesomeIcon += " fa-upload";
    }

    return (
      <React.Fragment>
        <input
          id="post-image"
          type="file"
          name="image"
          className="input-file"
          accept="image/gif, image/png, image/jpeg"
          onChange={this.uploadImage} />
        <label htmlFor="post-image">
          <i className={fontAwesomeIcon} aria-hidden="true"></i>
            {btnText}
        </label>
      </React.Fragment>
    );
  }
}

export default ImageInput;
