import http from "./httpService";

const apiEndpoint = "/messages";

export async function createNewGroup(members, groupName) {
  try {
    const response = await http.post(`${apiEndpoint}/newGroup`, { members, groupName });
    return response.data;
  } catch (ex) {
    console.log("Unable to create new group");
  }
}

export async function createPublicGroupChat(members, name) {
  try {
    const response = await http.post(`${apiEndpoint}/newMessageGroup`, { members, name });
    return response.data;
  } catch (ex) {
    console.log("Unable to create new pulbic group chat");
  }
}


export async function getGroup(name) {
  try {
    const response = await http.get(`${apiEndpoint}/retrieveGroup/${name}`);
    console.log("get group response", response);
    return response.data;
  } catch (ex) {
    console.log(ex);
  }
}

export async function updateGroupName(name, newName) {
  try {
    const response = await http.post(`${apiEndpoint}/updateGroupName`, { name, newName });
    
    return response.data;
  } catch (ex) {
    console.log(ex);
  }
}

export async function retrieveMessageGroups(user) {
  const response = await http.get(`${apiEndpoint}/retrieveMessageGroups/${user._id}`);
  //console.log("the response is ", response);
  return response;
}

export async function getMostRecentMessage(groupId) {
  //console.log('groupId', groupId);
  const response = await http.get(`${apiEndpoint}/getMostRecentMessage/${groupId}`);
  //console.log("^the response is ", response);
  return response;
}

export async function getCurrentGroupMembers(group) {
  const response = await http.get(`${apiEndpoint}/retrieveGroupMembers/${group._id}`);
  //console.log("ABOUT to get the response is ", response);
  return response.data;
}

export async function sendMessage(senderId, msg, groupId) {
  const response = await http.post(`${apiEndpoint}/newMessage/${senderId}/${groupId}`, { msg });
  return response.data;
}

export async function setReadState(groupId, messageId) {
  const response = await http.post(`${apiEndpoint}/readMessage/${groupId}/${messageId}`);
  return response.data;
}