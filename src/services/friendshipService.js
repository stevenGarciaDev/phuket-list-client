import http from "./httpService";

const apiEndpoint = "/friends";

export async function getPotentialFriends(email) {
  const res = await http.get(`${apiEndpoint}/potentialFriends/${email}`);
  console.log("response", res);
  return res.data;
}

export function addFriend(currentUserEmail, requestedUserEmail){
  return http.post(`${apiEndpoint}/addFriend`,{ currentUserEmail, requestedUserEmail });
}

export function acceptFriend(email,userid,emailuse){
  return http.put(`${apiEndpoint}/acceptFriend`,{email,userid,emailuse});
}

export function removeFriend(userEmailToRemove, currentUserEmail){
  return http.put(`${apiEndpoint}/removeFriend`,{ userEmailToRemove, currentUserEmail });
}

export async function getFriends(email){
  return await http.get(`${apiEndpoint}/getFriends`,{params:email});
}

export async function getFriendstatus(email,fremail){
  let test = await http.get(`${apiEndpoint}/getFriendstatus`,{params:{email,fremail}});
  return test.data;
}
