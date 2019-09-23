import http from "./httpService";
import jwtDecode from 'jwt-decode';

//const apiEndpoint = apiUrl + "/auth";
const apiEndpoint = "/auth";
const googleValidate = "/auth/google/callback/validate"

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

// API Post to verify if user exists, else create user with random password.
export function authenticateGoogle(name, email, password) {
  return http.post(googleValidate, {name, email, password});
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return user;
  }
  catch (ex) {
    return null;
  }
}


export function refreshCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return user;
  }
  catch (ex) {
    return null;
  }
}

export function getBucketList(user) {
  return http.get(`${apiEndpoint}/${user._id}`);
}