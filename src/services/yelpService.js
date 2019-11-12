import axios from "axios";

const yelpFusionBaseURL = process.env.REACT_APP_YELP_FUSION_API_URL;
const yelpAPIKey = process.env.REACT_APP_YELP_API_KEY;

/*
Make a GET request to Yelp Fusion API
for businesses based on keyword term, longitude, latitude
*/
export async function getRelatedBusinesses(term, latitude, longitude) {
  let result = [];
  try {
    // check if latitude and longitude are not null
    const searchTerm = term.toLowerCase();

    const queryResult = `${yelpFusionBaseURL}/businesses/search?term=${searchTerm}&latitude=${latitude}&longitude=${longitude}`;
    console.log("queryResult", queryResult);

    const result = await axios.get(`https://cors-anywhere.herokuapp.com/${yelpFusionBaseURL}/businesses/search?term=${searchTerm}&latitude=${latitude}&longitude=${longitude}`, {
      'headers': {
        'Authorization': `Bearer ${yelpAPIKey}`
      }
    })
    .then(result => {
      result = result.data.businesses;

      let data = [];
      for (let i = 0; i < 5; i++) {
        data.push(result[i]);
      }

      return data;
    })
    .catch(err => {
      console.log("Error making request to Yelp Fusion API")
    });

    return result;
  } catch (ex) {
    console.log("unable to complete", ex);
  }
}

// helper function
