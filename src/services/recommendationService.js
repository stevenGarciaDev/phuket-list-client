import http from './httpService';

const apiEndpoint = "/recommendations";

export async function getRecommendations() {
  const response = await http.get(`${apiEndpoint}/all`);
  console.log("response", response);
  return response.data;
}
