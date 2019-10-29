import React, { Component } from 'react';
import { getCurrentUser } from "../services/authService";
import { getUser, uploadNewProfileImage, updateProfileImage, updateProfile } from "../services/userService";
import { getListItems } from "../services/bucketListService";
import ImageInput from "./common/imageInput";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: { image: '' },
      imageToDisplay: '',
      imageToUpload: false,
      user: {},
      isEditing: false,
      bio: "",
      listItems: []
    }
  }

  async componentDidMount() {
    const currentUser = await getCurrentUser();
    const user = await getUser(currentUser._id);
    const jwt = localStorage.getItem("token");
    const response = await getListItems(currentUser, jwt);
    const listItems = response.data[0].listItems;

    this.setState({ user: user.data, imageToDisplay: user.data.photo, bio: user.data.bio, listItems: listItems });
  }

  toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  handleFileSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("token");
    const { user } = this.state;
    const { image } = this.state.data;

    // console.log("@current user's photo is ", user.photo);
    if (image !== "") {
      const photoResponse = await uploadNewProfileImage(image, jwt);
      this.setState({ imageToDisplay: photoResponse, imageToUpload: false });
      this.updateUserProfileImage(photoResponse, jwt);
    }
  }

  updateUserProfileImage = async (photo, jwt) => {
    const res = await updateProfileImage(photo, jwt);
  }

  handleBioChange = (e) => {
    const bio = e.target.value;
    this.setState({ bio });
  }

  handleBioUpdate = async () => {
    this.toggleEdit();
    console.log("bio update ..");
    const { user, bio } = this.state;
    const jwt = localStorage.getItem("token");
    const UIResponse = await updateProfile(user, bio, jwt);
    console.log("The UIResponse is", UIResponse);
  }

  handleFileChange = async (event) => {
    if (!this.state.imageToUpload) {
      const imageFile = event.target.files[0];
      const data = { ...this.state.data };
      data['image'] = imageFile;
      console.log("imageToUpload", !this.state.imageToUpload);
      this.setState({ data: data, imageToUpload: true });
    }
    else
    {
      const data = { ...this.state.data };
      data['image'] = '';
      console.log("imageToUpload", !this.state.imageToUpload);
      this.setState({ data: data, imageToUpload: false});
    }
  }

  displayEditOption = () => {
    // get current user from jwt,
    const currentUser = getCurrentUser();
    // get user that profile belongs to
    const { user, isEditing } = this.state;

    try {
      if (currentUser.email === user.email) {
        return (
          <React.Fragment>
            {
              isEditing ?
                <span>
                  <i className="fa fa-check-circle-o fa-2x"
                    aria-hidden="true"
                    onClick={() => this.handleBioUpdate()}></i>
                </span>
              :
                <span>
                  <i className="fa fa-pencil-square-o fa-2x"
                    aria-hidden="true"
                    onClick={() => this.toggleEdit()}></i>
                </span>
            }
          </React.Fragment>
        );
      }
    } catch (e) {
      console.log("Unable to compare users", e);
    }
  }

  displayUserBio = () => {
    const { bio, isEditing } = this.state;
    if (isEditing) {
      return <div><textarea value={bio} onChange={this.handleBioChange}/></div>;
    } else {
      return <p className="card-text">{bio || 'No bio available'}</p>;
    }
  }

  render() {
    const { listItems, imageToDisplay, imageToUpload } = this.state;
    const { image: photo } = this.state.data;
    console.log(listItems);

    return (
      <div className="container">

        <div className="row profile-container">
          <div className="col-md-4 col-md-push-8">
            <img
              alt="profile"
              className="profile-image"
              src={imageToDisplay || "https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"} />
          </div>

          <div className="col-md-8 col-md-pull-4">
            <div className="card text-left">
              <div className="card-header">
                About Me
              </div>
              <div className="card-body">
                { this.displayUserBio() }
                { this.displayEditOption() }
              </div>
            </div>
          </div>
        </div>

        <div className="row profile-container">
          <div className="col-md-4">

            <form onSubmit={(e) => {
              this.handleFileSubmit(e);
            }}>
              <ImageInput
                onFileChange={(e) => this.handleFileChange(e)}
                imageToUpload={imageToUpload} />
              <button className="btn btn-info btn-block" type="submit">Update Profile Image</button>
            </form>
          </div>

          <div className="col-md-8">
            <div className="card text-left">
              <div className="card-header">
                My Bucket List
              </div>
              <div className="card-body">
                <p className="card-text">
                  {
                    listItems.length > 0 ?
                      <ul>
                        { listItems.map(item => <li>{item.taskName}</li>) }
                      </ul>
                    :
                      <span>Not available.</span>
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default Profile;
