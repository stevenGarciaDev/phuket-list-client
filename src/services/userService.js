import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export async function getUsers() {
  return await http.get(`${apiEndpoint}/publicUsers`);
}

export async function getUser(id) {
  return await http.get(`${apiEndpoint}/retrieveUser/${id}`);
}
export async function getUserbyEmail(email) {
  return await http.get(`${apiEndpoint}/retrieveUserbyEmail/${email}`);
}

export async function retrieveUserId(name) {
  return await http.get(`${apiEndpoint}/retrieveUserId/${name}`);
}


export function getPublicuser(id) {
  return http.get(`${apiEndpoint}/publicUsers/${id}`);
}

export function getUserBasic(id) {
  return http.get(`${apiEndpoint}/user/basic/${id}`);
}

export async function getUserBioByID(id) {
  return http.get(`${apiEndpoint}/UserProfileBio/${id}`);
}

export async function getUserPhotoByID(id) {
  return http.get(`${apiEndpoint}/UserProfilePhoto/${id}`);
}

export async function deleteUser(id) {
  // return await http.delete(`deleteAccount/${id}`);
  return `deleted user, ${id}`;
}



export function forgotPassword(user){
  return http.post(`${apiEndpoint}/forgotPassword`,{email: user.email});
}

export function resetPassword(params){
  var tokens = params.params.resetPasswordToken;
  return http.get(`${apiEndpoint}/resetPassword`,{params: {token: tokens}});
}

export function updatePassword(params){
  console.log(params.params.email);
  console.log(params.params.data.Password);
  return http.put(`${apiEndpoint}/updatePassword`,{params});
}

export async function updateSettingDetail(user, detailName, value, jwt) {

  const response = await http.post(`${apiEndpoint}/settingDetail/${user._id}`,
    { user, detailName, value },
    { 'headers': {'x-auth-token': jwt }
  });
  //console.log(response); //user._id
  return response;
}

export async function getSettingtDetail(user, jwt) {

  const response = await http.get(`${apiEndpoint}/settingInfo/${user._id}`,

    { 'headers': {'x-auth-token': jwt }
  });
  //console.log(response); //user._id
  return response;
}

export async function updateProfile(user, bioText, jwt) {
  const response = await http.post(`${apiEndpoint}/updateBio/${user._id}`,
    { bioText },
    { 'headers': {'x-auth-token': jwt }
  });
  //console.log(response); //user._id
  return response;
}

export async function uploadNewProfileImage(image, jwt) {
  let uploadData = new FormData();
  uploadData.append('upload_preset', 'phuketlist');
  uploadData.append('file', image);
  uploadData.append('api_key', "771354541174957");
  const endpoint = "https://api.cloudinary.com/v1_1/phuketlist/image/upload";

  try {
    // send image to Cloudinary
    //console.log("about to send image");
    const res = await http.post(endpoint, uploadData);
    //console.log('@response is ', res.data.secure_url);
    image = res.data.secure_url;
  } catch (e) {
    console.log("Unable to send");
  }

  //console.log("@image is ", image);
  return image;
}

export async function updateProfileImage(image, jwt) {
  // save image, secure_url to User instance
  const response = await http.post(`${apiEndpoint}/updateProfileImage`,
    { image },
    { 'headers': {'x-auth-token': jwt }
  });
  console.log(`!response is ${response}`);
  return response;
}

export async function updatePhotoFile(user, photo, jwt) {

  const response = await http.put(`${apiEndpoint}/updatePhoto/${user.email}`,
    { photo },
    { 'headers': {'x-auth-token': jwt }
  });
  //console.log(response); //user._id
  return response;
}


export async function getUserBIO(user) {
   var returnBIO = "";

   await http.get(`${apiEndpoint}/UserBio/${user.email}`, {}).then(function(result) {

    returnBIO = result.data[0].bio;

  });
  return returnBIO;
}


export async function getUserPHOTO(user) {
  var returnPhoto = "";

  await http.get(`${apiEndpoint}/UserPhoto/${user.email}`, {}).then(function(result) {

  returnPhoto = result.data[0].photo;

 });
 return returnPhoto;
}
