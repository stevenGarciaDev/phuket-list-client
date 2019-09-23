import http from "./httpService";

//const apiEndpoint = apiUrl + "/comment";
const apiEndpoint = "/comment";

export async function createComment(text, postId, jwt) {
  const response = await http.post(`${apiEndpoint}/${postId}`,
    { text },
    { 'headers': {'x-auth-token': jwt }
  });
  return response;
}
