import React, { Component } from 'react';

class ImageInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagename: ''
    }
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(e) {
    this.props.onFileChange(e);
    var imagename = this.state.imagename;
    console.log();
    if(typeof e.target.files !== 'undefined' ){
      imagename = e.target.files[0].name;
      this.state.imagename = imagename;
    }
    else{
      imagename = '';
      this.state.imagename = imagename;
    }

    const { imageToUpload } = this.props;
    console.log("imageToUpload", !imageToUpload);

    //this.setState({ imageToUpload: !imageToUpload });
  }

  render() {
    const { imageToUpload } = this.props;
    const { imagename } = this.state;
    // get the name of the image as text
    let btnText = (imageToUpload) ? imagename : 'Choose an image...';
    let fontAwesomeIcon = "fa";
    if (imageToUpload) {
      fontAwesomeIcon += " fa-times remove-file";
    } else {
      fontAwesomeIcon += " fa-upload";
    }

    return (
      <div> { !imageToUpload
              ?
              <React.Fragment>
                <input
                  id="post-image"
                  type="file"
                  name="image"
                  className="input-file"
                  accept="image/gif, image/png, image/jpeg"
                  onChange={(e) => this.uploadImage(e)} />
                <label htmlFor="post-image">
                  <i className={fontAwesomeIcon} aria-hidden="true"></i>
                    {btnText}
                </label>
            </React.Fragment>
              :
              <React.Fragment>
                <span id="grid" onClick={(e) => this.uploadImage(e)}>
                <label htmlFor="post-image" className="remove-img-label">
                <i onclick={(e) => this.uploadImage(e)} className={fontAwesomeIcon} aria-hidden="true"></i>
                  {btnText}
                 </label>
                 </span>

            </React.Fragment>

            }
      </div>
    );
  }
}

export default ImageInput;
